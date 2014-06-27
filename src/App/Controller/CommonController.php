<?php

namespace App\Controller;

use App\Entity\TrackEvent;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class CommonController extends AbstractController
{

	public function appGlobalsAction(Request $request)
	{

		$uri = $request->getUri();
		$uri = str_replace($request->getSchemeAndHttpHost(), '', $uri);

		if (mb_strlen($request->getBaseUrl())) {
			$uri = str_replace( $request->getBaseUrl() , '', $uri);
		}
		$uri = str_replace(strrchr($uri, '.'), '', $uri);

		$uri = trim($uri, '/');

		$response = new Response('', 200, array(
			'Content-type' => 'text/javascript'
		));

		return $this->render('App:Common:appGlobals.html.twig', array(
			'uri' => $uri,
			'data' => array(
				'debug' => $this->container->getParameter('kernel.debug'),
				'base-url' => $request->getBaseUrl() . '/',
				'instagram-client-id' => $this->container->getParameter('app-instagram-client-id')
			)), $response);
	}

	public function imageProxyAction(Request $request)
	{
		$fileUrl = $request->query->get('url');

		// TODO: Verify current domain
		if ($request->headers->get('referer')) {

			$headers = [
				'Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Encoding:gzip,deflate,sdch',
				'Cache-Control:no-cache',
				'Pragma:no-cache',
				'User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/33.0.1750.152 Chrome/33.0.1750.152 Safari/537.36'
			];

			$opts = array(
				'http' => array(
					'method' => "GET",
					'header' => implode("\r\n", $headers)
				)
			);

			$context = stream_context_create($opts);

			$fileData = file_get_contents($fileUrl, false, $context);

			$response = new Response($fileData, 200, [
				'Content-type' => 'image/jpeg',
				'Accept-Ranges' => 'bytes',
				'Connection' => 'keep-alive',
			]);

			$response->headers->addCacheControlDirective('max-age', 290304000);
			$response->headers->addCacheControlDirective('public', true);

			return $response;
		}

		throw $this->createNotFoundException('Resource not found');

	}

	public function trackEventAction(Request $request) {

		$event = new TrackEvent();

		/** @var Form $form */
		$form = $this->createFormBuilder($event, [ 'csrf_protection' => false ])
			->add('category', 'text')
			->add('action', 'text')
			->add('value', 'number')
			->getForm();

		$form->handleRequest($request);

		if ($form->isValid()) {
			$this->persist($event, true);
//			$this->addFlash('success');

		}

		return new Response();
	}

	public function imagesCountTextAction() {

		/** @var QueryBuilder $qb */
		$qb = $this->getRepository('App:TrackEvent')
			->createQueryBuilder('te');

		$value = $qb->select('SUM(te.value) as value')
			->getQuery()->getSingleScalarResult();

		return $this->render('App:Common:imagesCountText.html.twig', [
			'count' => (int) $value
		]);
	}


	public function sitemapAction() {

		return $this->render('App:Common:sitemap.xml.twig', [

			'urls' => [
				[
					'loc' => $this->generateUrl('localized_homepage', [], true),
					'changefreq' => 'monthly',
					'priority' => 1
				],
				[
					'loc' => $this->generateUrl('faq',[], true),
					'changefreq' => 'weekly',
					'priority' => 1
				],
				[
					'loc' => $this->generateUrl('contact',[], true),
					'changefreq' => 'monthly'
				],
			]

		]);

	}
}
