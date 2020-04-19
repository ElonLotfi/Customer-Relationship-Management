<?php


namespace App\Events ;

use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\Security\Core\Security;

class CustomerUserSubscriber implements EventSubscriberInterface {

    private $security;



    public function __construct(Security $security)
    {
        $this->security = $security ;   
    }


    public static function getSubscribedEvents(){

        return [
            KernelEvents::VIEW => ['getConnectedUser', EventPriorities::PRE_VALIDATE],
        ];


    }

    public function getConnectedUser(ViewEvent $viewEvent){
        $customer = $viewEvent->getControllerResult();
        $methode = $viewEvent->getRequest()->getMethod();

        if($customer instanceof Customer && $methode === "POST"){
            $customer->setUser($this->security->getUser()); // attraper L'utilisateur et l'assigneé au customer 
        }
    }




}