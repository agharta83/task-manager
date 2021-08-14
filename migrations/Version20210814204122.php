<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210814204122 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE todo (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(125) NOT NULL, description VARCHAR(500) DEFAULT NULL, date_create DATETIME NOT NULL, note VARCHAR(500) DEFAULT NULL, state ENUM(\'0\', \'1\', \'2\', \'3\', \'4\', \'5\', \'6\') DEFAULT NULL COMMENT \'(DC2Type:TodoStateType)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE todo_category (todo_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_219B51A1EA1EBC33 (todo_id), INDEX IDX_219B51A112469DE2 (category_id), PRIMARY KEY(todo_id, category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE todo_category ADD CONSTRAINT FK_219B51A1EA1EBC33 FOREIGN KEY (todo_id) REFERENCES todo (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE todo_category ADD CONSTRAINT FK_219B51A112469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE todo_category DROP FOREIGN KEY FK_219B51A1EA1EBC33');
        $this->addSql('DROP TABLE todo');
        $this->addSql('DROP TABLE todo_category');
    }
}
