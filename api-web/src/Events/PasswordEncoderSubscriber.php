<?php



namespace App\Events ;


use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;








class PasswordEncoderSubscriber implements EventSubscriberInterface {


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


    public static function getSubscribedEvents(){
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE],
        ];
    }


    public function encodePassword(ViewEvent $viewEvent){
        $user = $viewEvent->getControllerResult();
        $methode = $viewEvent->getRequest()->getMethod();

        if($user instanceof User && $methode === "POST"){
            $hash = $this->encoder->encodePassword($user,$user->getPassword());
            $user->setPassword($hash);
            
        }
    }

}