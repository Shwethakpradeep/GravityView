var ViewConstants = require('../constants/view-constants.js');
var ViewDispatcher = require('../dispatcher/view-dispatcher');

/**
 * Helper function to dispatch
 * @param action Action type constant
 * @param values
 */
function updateSettings( action, values ) {
    ViewDispatcher.dispatch({
        actionType: action,
        values: values
    });
}


var ViewApi = {

    // *** View Settings *** //

    /**
     * Fetch the list of the available forms
     */
    getFormsList: function() {
        updateSettings( ViewConstants.UPDATE_FORMS_LIST, gravityview_view_settings.forms_list );
    },

    /**
     * Fetch the configured forms assigned to the view
     */
    getConfiguredActiveForms: function() {
        updateSettings( ViewConstants.UPDATE_FORMS_ACTIVE, gravityview_view_settings.forms );
    },

    /**
     * Fetch Settings Sections from server
     *
     * @param forms
     * @param templates
     */
    getSettingsSections: function( forms, templates ) {
        updateSettings( ViewConstants.UPDATE_SETTINGS_SECTIONS, gravityview_view_settings.settings_sections );
    },

    /**
     * Fetch Settings Inputs from server
     * @param forms
     * @param templates
     */
    getSettingsInputs: function( forms, templates ) {
        // todo: fetch using AJAX. When form changes or template, the settings inputs may change

        updateSettings( ViewConstants.UPDATE_SETTINGS_INPUTS, gravityview_view_settings.settings_inputs );
    },

    /**
     * Fetch saved Settings Values from server
     */
    getSettingsAllValues: function() {
        updateSettings( ViewConstants.UPDATE_SETTINGS_ALL, gravityview_view_settings.settings_values );
    },


    // *** View Fields *** //

    getSavedLayout: function() {

        var data = {
            action: 'gv_get_saved_layout',
            view: jQuery('#post_ID').val(),
            nonce: gvGlobals.nonce
        };

        jQuery.ajax( {
            type: 'POST',
            url: ajaxurl,
            data: data,
            dataType: 'json',
            async: true
        } ).done( function ( response ) {
            updateSettings( ViewConstants.UPDATE_LAYOUT_ALL, response.data );
        } ).fail( function ( jqXHR ) {
            console.log( jqXHR );
        } ).always( function () {
            //
        } );
    },

    /**
     * Fetch Fields Sections from server
     *
     * @param forms
     * @param templates
     */
    getFieldsSections: function( forms, templates ) {
        updateSettings( ViewConstants.UPDATE_FIELDS_SECTIONS, gravityview_view_settings.fields_sections );
    },

    /**
     * Fetch Fields List
     *
     * @param forms
     * @param context
     */
    getFieldsList: function( forms ) {

        var data = {
            action: 'gv_get_fields_list',
            forms: forms,
            nonce: gvGlobals.nonce
        };

        jQuery.ajax( {
            type: 'POST',
            url: ajaxurl,
            data: data,
            dataType: 'json',
            async: true
        } ).done( function ( response ) {
            console.log(response.data);
            updateSettings( ViewConstants.UPDATE_FIELDS_LIST, response.data );
        } ).fail( function ( jqXHR ) {
            console.log( jqXHR );
        } ).always( function () {
            //
        } );

    },

    /**
     * Get the field settings array
     * @param args object Pointer containing 'context', 'row', 'col' and 'field' (field_id, form_id, field_type, ..)
     */
    getFieldSettings: function( args ) {

        var data = {
            action: 'gv_get_field_settings_values',
            //template: templateId,
            context: args.context,
            field_id: args.field['field_id'],
            field_type: args.field['field_type'],
            field_label: args.field['field_label'],
            form_id: '254',
            nonce: gvGlobals.nonce
        };

        jQuery.ajax( {
            type: 'POST',
            url: ajaxurl,
            data: data,
            dataType: 'json',
            async: true
        } ).done( function ( response ) {

            var values = {
                pointer: args,
                settings: response.data
            };

            updateSettings( ViewConstants.UPDATE_FIELD_SETTINGS, values );
        } ).fail( function ( jqXHR ) {
            console.log( jqXHR );
        } ).always( function () {
            //
        } );


    },


};

module.exports = ViewApi;