<?php
/**
 * The default select field output template.
 *
 * @since future
 */
$field = $gravityview->field->field;
$display_value = $gravityview->display_value;
$entry = $gravityview->entry->as_entry();
$field_settings = $gravityview->field->as_configuration();

/**
 * @filter `gravityview/fields/select/output_label` Override whether to show the value or the label of a Select field
 * @since 1.5.2
 * @param bool $show_label True: Show the label of the Choice; False: show the value of the Choice. Default: `false`
 * @param array $entry GF Entry
 * @param GF_Field_Select $field Gravity Forms Select field
 */
$show_label = apply_filters( 'gravityview/fields/select/output_label', ( 'label' === rgar( $field_settings, 'choice_display' ) ), $entry, $field );

if ( $show_label && ! empty( $field->choices ) && is_array( $field->choices ) && '' !== $display_value ) {
	$output = RGFormsModel::get_choice_text( $field, $display_value );
} else {
	$output = $display_value;
}

echo $output;