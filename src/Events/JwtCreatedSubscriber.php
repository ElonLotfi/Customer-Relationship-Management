<?

namespace App\Events ;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use App\Entity\User ;


class JwtCreatedSubscriber {

    public function updateJwtData(JWTCreatedEvent $jWTCreatedEvent ){
        //dd($jWTCreatedEvent) ;
        $user = $jWTCreatedEvent->getUser();

        if($user instanceof User ){
            $data = $jWTCreatedEvent->getData();
            $data['firstname'] = $user->getFirstName();
            $data['lastname'] = $user->getLastName();
            $jWTCreatedEvent->setData($data);
        }
       
    }



}