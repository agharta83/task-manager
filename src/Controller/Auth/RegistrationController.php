<?php

namespace App\Controller\Auth;

use App\Controller\BaseController;
use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\EmailVerifier;
use DateTime;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends BaseController
{
    /** @var EmailVerifier  */
    private EmailVerifier $emailVerifier;

    public function __construct(EmailVerifier $emailVerifier)
    {
        $this->emailVerifier = $emailVerifier;
    }

    /**
     * @Route("/api/user/register", name="app_register", methods={"POST"})
     * @param Request $request
     * @param UserPasswordHasherInterface $passwordEncoder
     * @return Response
     * @throws TransportExceptionInterface
     */
    public function register(Request $request, UserPasswordHasherInterface $passwordEncoder): Response
    {
        $data = json_decode($request->getContent(), true);

        if ($data === null) {
            throw new BadRequestHttpException('Invalid JSON');
        }

        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user, [
            'csrf_protection' => false,
        ]);

        $form->submit($data);

        if (!$form->isValid()) {
            $errors = $this->getErrorsFromForm($form);

            return $this->createApiResponse([
                'errors' => $errors
            ], 403);
        }

        // encode the plain password
        $user->setPassword(
            $passwordEncoder->hashPassword(
                $user,
                $form->get('plainPassword')->getData()
            )
        );

        $user->setPseudo($user->generateRandomUsername());
        $user->setDateCreate(new DateTime('now'));
        $user->setIsActif(true);

        $this->getDoctrine()->getManager()->persist($user);
        $this->getDoctrine()->getManager()->flush();

        // generate a signed url and email it to the user
        $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
            (new TemplatedEmail())
                ->from(new Address('support@task-manager.com', 'support'))
                ->to($user->getEmail())
                ->subject('Confirmation adresse email')
                ->htmlTemplate('registration/confirmation_email.html.twig')
        );

        return $this->createApiResponse($user->getEmail(), 200);
    }

    /**
     * @Route("/verify/email", name="app_verify_email")
     * @param Request $request
     * @return Response
     */
    public function verifyUserEmail(Request $request): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        // validate email confirmation link, sets User::isVerified=true and persists
        try {
            $this->emailVerifier->handleEmailConfirmation($request, $this->getUser());
        } catch (VerifyEmailExceptionInterface $exception) {
//            $this->addFlash('verify_email_error', $exception->getReason());

            $response = [
                "emailVerify" => false,
            ];

            return $this->redirectToRoute('index', $response);

        }

        $response = [
            "emailVerify" => true,
        ];

        return $this->redirectToRoute('index', $response);
    }
}
