<?php

namespace TomAtom\AtomBundle\Twig;

use TomAtom\AtomBundle\Entity\Atom;
use \Symfony\Component\Security\Core\SecurityContext;
use \Doctrine\Common\Persistence\ObjectManager;

abstract class Template extends \Twig_Template
{
    /**
     * @var ObjectManager
     */
    protected $em;
    
    /**
     * @var SecurityContext
     */
    protected $sc;
    
    public function __construct(\Twig_Environment $env) 
    {
        parent::__construct($env);
        
        $taExt = $env->getExtension('tom_atom_extension');
        
        $this->em = $taExt->getEntityManager();
        $this->sc = $taExt->getSecurityContext();
    }
    
    public function displayAtom($name, $body, array $context) 
    {
        $atom = $this->em->getRepository('TomAtomAtomBundle:Atom')
                ->findOneBy(array('name' => $name));
            
        if(!$atom)
        {
            $atom = new Atom();
            $atom->setName($name);
            $atom->setBody($body);
            $this->em->persist($atom);
            $this->em->flush();
        }
        else
        {
            $body = $atom->getBody();
        }
        
        if($this->sc->isGranted('IS_AUTHENTICATED_FULLY'))
        {
            echo '<div class="atom" id="'.$name.'">';
            echo $body;
            echo '</div>';
        }
        else
        {
            echo $body;
        }
    }
}