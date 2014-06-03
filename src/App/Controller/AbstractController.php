<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

abstract class AbstractController extends Controller
{
	/**
	 * Shortcut to persist->flush action
	 *
	 * @param $object mixed A doctrine entity to flush
	 * @param bool $flush Set true to immediately flush changes
	 */
	protected function persist($object, $flush = false) {

		$this->getDoctrine()->getManager()->persist($object);

		if ($flush) {
			$this->getDoctrine()->getManager()->flush();
		}
	}

	/**
	 * Shortcut to repository
	 * @param $repoName
	 * @return \Doctrine\Common\Persistence\ObjectRepository
	 */
	protected function getRepository($repoName) {

		return $this->getDoctrine()->getManager()->getRepository($repoName);
	}
}
