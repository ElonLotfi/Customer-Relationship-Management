<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create();
        $chrono = 1;

        for($c=0 ; $c<30; $c++){
            $customer = new Customer('fr_FR');
            $customer->setFirstname($faker->firstName())
                     ->setLastname($faker->lastName)
                     ->setEmail($faker->email)
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
