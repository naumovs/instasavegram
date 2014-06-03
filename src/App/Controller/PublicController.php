<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use Symfony\Component\HttpFoundation\Request;

class PublicController extends AbstractController
{

	public function homepageAction(Request $request)
	{
		if ($request->getRequestUri() === $request->getBaseUrl()) {
			$this->redirect($this->generateUrl('homepage') + '/', 301);
		}

		return $this->render('App:Public:homepage.html.twig', array(
			'instagram_client_id' => $this->container->getParameter('app-instagram-client-id')
		));
	}

	public function profileAction()
	{
		return $this->render('App:Public:profile.html.twig');
	}

	public function faqAction() {
		return $this->render('App:Public:faq.html.twig');
	}

	public function contactAction(Request $request) {

		$contact = new Contact();

		$form = $this->createForm(new ContactType(), $contact, [
			'method' => 'POST',
			'action' => $this->generateUrl('contact')
		]);


		$form->handleRequest($request);

		if ($form->isValid()) {

			$this->persist($contact, true);

			return $this->render('App:Public:contact.success.html.twig');
		}

		return $this->render('App:Public:contact.html.twig', [
			'form' => $form->createView(),
		]);
	}
}
