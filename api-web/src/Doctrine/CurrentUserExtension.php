<?php

namespace App\Doctrine ;

use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface ,QueryItemExtensionInterface {
    
    private $security ;
    private $auth; // pour donner l'acces au admin et ignorer les regles qui s'applique au utilisateur 

    /**
     * le but est de choper les invoices et les attriubuer juste au utilisateur concerné & autre chose L'admin possede l'acces a tout les invoices 
     *
     * @param Security $security
     * @param AuthorizationCheckerInterface $cheker
     */
    public function __construct(Security $security,AuthorizationCheckerInterface $cheker)
    {
        $this->security = $security ;
        $this->auth = $cheker ;
        
    }



    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass){

        $user = $this->security->getUser();
        // si on demande des invoices ou des customers , agir sur les requetes pour quelle tienne compte l'utilisateur connecteé ;
        if(! $this->auth->isGranted('ROLE_ADMIN') && $user instanceof User){ // ICI pour verifier si l'utilisateur connecté n'est pas l'administrateur
        if($resourceClass === Invoice::class || $resourceClass === Customer::class){
            $rootAlias = $queryBuilder->getRootAliases()[0];
            if($resourceClass === Customer::class){
                    $queryBuilder->andWhere("$rootAlias.user = :user");
            }
            else if($resourceClass === Invoice::class){
                    $queryBuilder->join("$rootAlias.customer" ,"c")
                                 ->andWhere("c.user = :user");
            }
            $queryBuilder->setParameter("user",$user);
        }
    }
    }



    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null){
            // choper L'utilisateur 
            
            $this->addWhere($queryBuilder,$resourceClass);

    }


    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = []){
        $this->addWhere($queryBuilder,$resourceClass);

    }





}