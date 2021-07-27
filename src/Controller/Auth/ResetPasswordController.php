<?php

namespace App\Controller\Auth;

use App\Controller\BaseController;
use App\Entity\User;
use App\Form\ResetPasswordRequestFormType;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

/**
 * @Route("api/user/reset-password")
 */
class ResetPasswordController extends BaseController
{
    use ResetPasswordControllerTrait;

    private ResetPasswordHelperInterface $resetPasswordHelper;

    public function __construct(ResetPasswordHelperInterface $resetPasswordHelper)
    {
        parent::__construct();
        $this->resetPasswordHelper = $resetPasswordHelper;
    }

    /**
     * Display & process form to request a password reset.
     *
     * @Route("/forgot-password", name="app_forgot_password_request")
     * @param Request $request
     * @param MailerInterface $mailer
     * @return Response
     * @throws TransportExceptionInterface
     */
    public function request(Request $request, MailerInterface $mailer): Response
    {
        $data = json_decode($request->getContent(), true);

        if ($data === null) {
            throw new BadRequestHttpException('Invalid JSON');
        }

        $form = $this->createForm(ResetPasswordRequestFormType::class, null, [
            'csrf_protection' => false,
        ]);
        $form->submit($data);

        if (!$form->isValid()) {
            $errors = $this->getErrorsFromForm($form);

            return $this->createApiResponse([
                'errors' => $errors
            ], 403);
        }

        $result = $this->processSendingPasswordResetEmail(
            $form->get('email')->getData(),
            $mailer
        );

        return $this->createApiResponse([
            $result,
        ], 200);

    }

    /**
     * Confirmation page after a user has requested a password reset.
     *
     * @Route("/check-email", name="app_check_email")
     */
    public function checkEmail(): array
    {
        // Generate a fake token if the user does not exist or someone hit this page directly.
        // This prevents exposing whether or not a user was found with the given email address or not
        if (null === ($resetToken = $this->getTokenObjectFromSession())) {
            $resetToken = $this->resetPasswordHelper->generateFakeResetToken();
        }

        return $response = [
            'success' => 'Mail de réinitialisation envoyé !'
        ];

//        return $this->render('reset_password/check_email.html.twig', [
//            'resetToken' => $resetToken,
//        ]);
    }

    /**
     * Validates and process the reset URL that the user clicked in their email.
     *
     * @Route("/reset/{token}", name="app_reset_password")
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param string|null $token
     * @return Response
     */
    public function reset(Request $request, UserPasswordEncoderInterface $passwordEncoder, string $token = null): Response
    {
        if ($token) {
            // We store the token in session and remove it from the URL, to avoid the URL being
            // loaded in a browser and potentially leaking the token to 3rd party JavaScript.
            $this->storeTokenInSession($token);

            return $this->redirectToRoute('app_reset_password');
        }

        return $this->redirect('https://127.0.0.1:8000/user/reset-password');

//        $token = $this->getTokenFromSession();
//        if (null === $token) {
//            throw $this->createNotFoundException('No reset password token found in the URL or in the session.');
//        }
//
//        try {
//            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);
//        } catch (ResetPasswordExceptionInterface $e) {
//            $this->addFlash('reset_password_error', sprintf(
//                'There was a problem validating your reset request - %s',
//                $e->getReason()
//            ));
//
//            return $this->redirectToRoute('app_forgot_password_request');
//        }
//
//        // The token is valid; allow the user to change their password.
//        $form = $this->createForm(ChangePasswordFormType::class);
//        $form->handleRequest($request);
//
//        if ($form->isSubmitted() && $form->isValid()) {
//            // A password reset token should be used only once, remove it.
//            $this->resetPasswordHelper->removeResetRequest($token);
//
//            // Encode the plain password, and set it.
//            $encodedPassword = $passwordEncoder->encodePassword(
//                $user,
//                $form->get('plainPassword')->getData()
//            );
//
//            $user->setPassword($encodedPassword);
//            $this->getDoctrine()->getManager()->flush();
//
//            // The session is cleaned up after the password has been changed.
//            $this->cleanSessionAfterReset();
//
//            return $this->redirectToRoute('index');
//        }
//
//        return $this->render('reset_password/reset.html.twig', [
//            'resetForm' => $form->createView(),
//        ]);
    }

    /**
     * Validates and process the reset URL that the user clicked in their email.
     *
     * @Route("/reset-form", name="reset_password_form")
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return Response
     */
    public function resetPassword(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $token = $this->getTokenFromSession();
        if (null === $token) {
            throw $this->createNotFoundException('No reset password token found in the URL or in the session.');
        }

        try {
            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);
        } catch (ResetPasswordExceptionInterface $e) {
            $message = 'There was a problem validating your reset request - %s => ' . $e->getReason();

            return $this->createApiResponse([
                'errors' => $message
            ], 403);
        }

        // The token is valid; allow the user to change their password.
        $data = json_decode($request->getContent(), false);

        if ($data === null) {
            throw new BadRequestHttpException('Invalid JSON');
        }

        // A password reset token should be used only once, remove it.
        $this->resetPasswordHelper->removeResetRequest($token);

        // Encode the plain password, and set it.
        $encodedPassword = $passwordEncoder->encodePassword(
            $user,
            $data->plainPassword
        );

        $user->setPassword($encodedPassword);
        $this->entityManager->flush();

        // The session is cleaned up after the password has been changed.
        $this->cleanSessionAfterReset();

        return $this->createApiResponse([
            'success' => 'Mot de passe mis à jour'
        ], 200);
    }

    /**
     * @param string $emailFormData
     * @param MailerInterface $mailer
     * @return string[]
     * @throws TransportExceptionInterface
     */
    private function processSendingPasswordResetEmail(string $emailFormData, MailerInterface $mailer): array
    {
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
            'email' => $emailFormData,
        ]);

        // Do not reveal whether a user account was found or not.
        if (!$user) {
            return $this->checkEmail();
        }

        try {
            $resetToken = $this->resetPasswordHelper->generateResetToken($user);
        } catch (ResetPasswordExceptionInterface $e) {
            // If you want to tell the user why a reset email was not sent, uncomment
            // the lines below and change the redirect to 'app_forgot_password_request'.
            // Caution: This may reveal if a user is registered or not.
            //
            // $this->addFlash('reset_password_error', sprintf(
            //     'There was a problem handling your password reset request - %s',
            //     $e->getReason()
            // ));

            return $this->checkEmail();
        }

        $email = (new TemplatedEmail())
            ->from(new Address('support@task-manager.com', 'Support Task Manager'))
            ->to($user->getEmail())
            ->subject('Votre demande de réinitialisation de mot de passe')
            ->htmlTemplate('reset_password/email.html.twig')
            ->context([
                'resetToken' => $resetToken,
            ]);

        $mailer->send($email);

        // Store the token object in session for retrieval in check-email route.
        $this->setTokenObjectInSession($resetToken);

        return $this->checkEmail();
    }
}
