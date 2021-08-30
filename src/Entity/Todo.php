<?php

namespace App\Entity;

use App\Repository\TodoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Fresh\DoctrineEnumBundle\Validator\Constraints as DoctrineAssert;

/**
 * @ORM\Entity(repositoryClass=TodoRepository::class)
 */
class Todo
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\Column(type="string", length=125)
     */
    private ?string $title;

    /**
     * @ORM\Column(type="string", length=500, nullable=true)
     */
    private ?string $description;

    /**
     * @ORM\Column(type="datetime")
     */
    private ?\DateTimeInterface $dateCreate;

    /**
     * @ORM\Column(type="string", length=500, nullable=true)
     */
    private ?string $note;

    /**
     * @ORM\Column(name="state", type="TodoStateType", nullable=true)
     * @DoctrineAssert\Enum(entity="App\DBAL\Types\TodoStateType")
     */
    private $state;

    /**
     * @ORM\ManyToMany(targetEntity=Category::class, inversedBy="todos", cascade={"persist"})
     */
    private Collection $category;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="todos")
     * @ORM\JoinColumn(nullable=false)
     */
    private ?User $user;

    /**
     * @ORM\Column(type="boolean")
     */
    private ?bool $scheduled;

    /**
     * @ORM\OneToOne(targetEntity=ScheduledTodo::class, mappedBy="todo", cascade={"persist", "remove"})
     */
    private ?ScheduledTodo $scheduledTodo;

    /**
     * @ORM\Column(type="boolean")
     */
    private ?bool $priority;

    public function __construct()
    {
        $this->category = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDateCreate(): ?\DateTimeInterface
    {
        return $this->dateCreate;
    }

    public function setDateCreate(\DateTimeInterface $dateCreate): self
    {
        $this->dateCreate = $dateCreate;

        return $this;
    }

    public function getNote(): ?string
    {
        return $this->note;
    }

    public function setNote(?string $note): self
    {
        $this->note = $note;

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategory(): Collection
    {
        return $this->category;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->category->contains($category)) {
            $this->category[] = $category;
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        $this->category->removeElement($category);

        return $this;
    }

    /**
     * @return mixed
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * @param mixed $state
     */
    public function setState($state): void
    {
        $this->state = $state;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getScheduled(): ?bool
    {
        return $this->scheduled;
    }

    public function setScheduled(bool $scheduled): self
    {
        $this->scheduled = $scheduled;

        return $this;
    }

    public function getScheduledTodo(): ?ScheduledTodo
    {
        return $this->scheduledTodo;
    }

    public function setScheduledTodo(ScheduledTodo $scheduledTodo): self
    {
        // set the owning side of the relation if necessary
        if ($scheduledTodo->getTodo() !== $this) {
            $scheduledTodo->setTodo($this);
        }

        $this->scheduledTodo = $scheduledTodo;

        return $this;
    }

    public function getPriority(): ?bool
    {
        return $this->priority;
    }

    public function setPriority(bool $priority): self
    {
        $this->priority = $priority;

        return $this;
    }
}
