<?php
namespace Wordlift\Faq;

class Faq_TinyMce_Adapter {
	/**
	 * The {@link Wordlift} plugin instance.
	 *
	 * @since  3.12.0
	 * @access private
	 * @var \Wordlift $plugin The {@link \Wordlift} plugin instance.
	 */
	private $plugin;

	/**
	 * Wordlift_Tinymce_Adapter constructor.
	 *
	 * @param \Wordlift $plugin The {@link \Wordlift} plugin instance.
	 */
	public function __construct( $plugin ) {

		$this->plugin = $plugin;

	}

	function load_faq_tiny_mce_plugin( $plugins ) {
		$plugins['wl_faq_mce_plugin'] = plugin_dir_path( dirname(__FILE__ ) )."js/faq-widget.js";
		return $plugins;
	}
}