<? 

namespace App\Events;

use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\Security\Core\Security;

class InvoiceChronoSubscriber implements EventSubscriberInterface{

    private $security;
    private $repo;


    public function __construct(Security $security ,InvoiceRepository $repo)
    {
            $this->security = $security;
            $this->repo = $repo;
    }


    public static function getSubscribedEvents(){

        return [
            KernelEvents::VIEW => ['incrementChrono', EventPriorities::PRE_VALIDATE],
        ];
        

    }

    public function incrementChrono (ViewEvent $viewEvent){
            $invoice = $viewEvent->getControllerResult();
            $methode = $viewEvent->getRequest()->getMethod();
            //dd($nextChrono = $this->repo->findNextChrono($this->security->getUser()));

            if($invoice instanceof Invoice && $methode === "POST"){
                   $user =  $this->security->getUser();
                   $nextChrono = $this->repo->findNextChrono($this->security->getUser());
                   $invoice->setChrono($nextChrono + 1);

            }

    }






}