<?php

namespace App\Shared\Composer;

use Sensio\Bundle\DistributionBundle\Composer\ScriptHandler as BaseScriptHandler;
use Symfony\Component\Process\Process;
use Symfony\Component\Filesystem\Filesystem;

class ScriptHandler extends BaseScriptHandler
{
	public static function installBower($event)
	{
		$process = new Process('bower install');
		$process->run(function ($type, $buffer) { echo $buffer; });
		if (!$process->isSuccessful()) {
			throw new \RuntimeException(sprintf('An error occurred when executing the "%s" command.', escapeshellarg('bower install')));
		}

		if (!function_exists('symlink')) {
			throw new \InvalidArgumentException('The symlink() function is not available on your system. You need to install the assets without the --symlink option.');
		}

		$filesystem = new Filesystem();

		$filesystem->mkdir('web/vendor');
		$filesystem->symlink('../../bower_components', 'web/vendor/bower_components');

	}

	public static function installClientApp($event)
	{
		if (!function_exists('symlink')) {
			throw new \InvalidArgumentException('The symlink() function is not available on your system. You need to install the assets without the --symlink option.');
		}

		$filesystem = new Filesystem();

		$filesystem->mkdir('web/vendor');
		$filesystem->symlink('../src/App/Resources/app', 'web/app');

	}


	public static function buildClientApp($event) {

		$process = new Process('brunch build');
		$process->run(function ($type, $buffer) { echo $buffer; });
		if (!$process->isSuccessful()) {
			throw new \RuntimeException(sprintf('An error occurred when executing the "%s" command.', escapeshellarg('bower install')));
		}

	}
}
