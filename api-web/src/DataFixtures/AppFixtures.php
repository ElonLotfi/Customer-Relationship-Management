<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $encoder ;
    /**
     * encoder les mot de passe dans la base de données 
     *
     * @param UserPasswordEncoderInterface 
     */

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder ;   
    }
    
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('fr_FR');
        for($t = 0 ; $t <10 ; $t++){
            $user = new User();
            $chrono = 1;
            $hash = $this->encoder->encodePassword($user,"password");
            $user->setEmail($faker->email)
                ->setFirstname($faker->firstName())
                ->setLastname($faker->lastName)
                ->setPassword($hash);
            $manager->persist($user);
            for($c=0 ; $c<mt_rand(3,6); $c++){
                $customer = new Customer();
                $customer->setFirstname($faker->firstName())
                         ->setLastname($faker->lastName)
                         ->setEmail($faker->email)
                         ->setUser($user)
                         ->setCompany($faker->company);
                $manager->persist($customer);
    
                for($k=0;$k <mt_rand(3,29) ; $k++){
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2,40,2500))
                            ->setSentAt($faker->dateTimeThisYear())
                            ->setStatus($faker->randomElement(['PAID','CANCELED','SENT']))
                            ->setCustomer($customer)
                            ->setChrono($chrono);
                    $chrono++;
    
                    $manager->persist($invoice);
                }
    
                
            }
    
            $manager->flush();
        }


        }


}
