/**
 * This file register WordLift's `wordlift/annotation` format type.
 *
 * The `wordlift/annotation` format type is used to receive selection changes
 * event from `paragraph` blocks and broadcasts them as WordPress' action.
 *
 * Its use is similar to the `tiny-mce` adapter which listens to selection changes
 * in `classic` blocks.
 *
 * @author David Riccitelli <david@wordlift.io>
 * @since 3.23.0
 */

/**
 * External dependencies
 */
import React from "react";

/**
 * WordPress dependencies
 */
import { registerFormatType } from "@wordpress/rich-text";
import { Fragment } from "@wordpress/element";
import { doAction } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import { ANNOTATION_CHANGED, SELECTION_CHANGED } from "../common/constants";

/**
 * @see https://developer.wordpress.org/block-editor/tutorials/format-api/1-register-format/
 */
let delay;
registerFormatType("wordlift/annotation", {
  tagName: "span",
  className: "textannotation",
  title: "Annotation",
  edit: e => {
    console.log(e);
    const value = e.value;

    // Send the selection change event.
    if (delay) clearTimeout(delay);
    delay = setTimeout(() => {
      const selection = value.text.substring(value.start, value.end);
      doAction(SELECTION_CHANGED, { selection });
    }, 200);

    // Send the annotation change event.
    const payload =
      "undefined" !== typeof value.activeFormats &&
      0 < value.activeFormats.length &&
      "undefined" !== typeof value.activeFormats[0].unregisteredAttributes &&
      "undefined" !== typeof value.activeFormats[0].unregisteredAttributes.id
        ? value.activeFormats[0].unregisteredAttributes.id
        : undefined;
    doAction(ANNOTATION_CHANGED, payload);

    return <Fragment />;
  }
});
