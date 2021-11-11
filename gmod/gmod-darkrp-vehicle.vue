<!-- Template -->
<template><span>DarkRP.createVehicle({
    name = "{{ form.entity }}",
    model = "{{ form.model }}",
    price = {{ form.price }},
    label = "{{ form.name }}"{{ outputs.category(this, form) }}{{ outputs.allowed(this, form) }}{{ customCheck.template(form) }}
})</span></template>

<!-- Script -->
<script>

    // Shared
    var sharedCheck = require('./_gmod-customcheck');
    
    // Module
    module.exports = {
        
        mixins: [require('../base')],
        
        data() {
            return {
                customCheck: sharedCheck,
                
                key: 'gmod-darkrp-vehicle',
                name: 'Vehicle Generator',
                short: 'Vehicle',
                game: 'gmod',
                mod: 'darkrp',
                language: 'lua',
                
                title: function(form) {
                    return form.name;
                },
                
                outputs: {
                    category: function(vm, form) {
                        return vm.udefHide(form.category, function(value) {
                            return 'category = "'+value+'"';
                        }, true);
                    },
                    allowed: function(vm, form) {
                        return vm.udefHide(form.allowed, function(value) {
                            return 'allowed = {'+value+'}';
                        }, true);
                    },
                },
                
                categories: {
                    base: {
                        name: '<b>Base</b> Configuration',
                        inputs: {
                            name: {
                                name: 'name',
                                type: 'text',
                                label: 'Name',
                                required: true,
                                placeholder: 'E.g. Airboat',
                                description: 'The name shown in the F4 menu.'
                            },
                            model: {
                                name: 'model',
                                type: 'text',
                                label: 'Model',
                                required: true,
                                placeholder: 'E.g. models/airboat.mdl',
                                description: 'The model shown in the F4 menu.'
                            },
                            category: {
                                name: 'category',
                                type: 'text',
                                label: 'Category',
                                required: false,
                                placeholder: 'E.g. Air Vehicles',
                                description: 'The category the vehicle should show up in. (DarkRP 2.6+)'
                            }
                        }
                    },
                    entity: {
                        name: '<b>Entity</b> Configuration',
                        inputs: {
                            entity: {
                                name: 'entity',
                                type: 'text',
                                label: 'Entity',
                                required: true,
                                placeholder: 'E.g. airboat',
                                description: 'The entity name. Can be found in the Q menu under vehicles.',
                            }
                        }
                    },
                    economy: {
                        name: '<b>Economy</b> Configuration',
                        inputs: {
                            price: {
                                name: 'price',
                                type: 'number',
                                label: 'Price',
                                required: true,
                                placeholder: 'E.g. 25000',
                                description: 'The vehicle price.'
                            }
                        }
                    },
                    team: {
                        name: '<b>Team</b> Configuration',
                        inputs: {
                            allowed: {
                                name: 'allowed',
                                type: 'token',
                                label: 'Allowed',
                                required: false,
                                placeholder: 'E.g. TEAM_CHIEF, TEAM_POLICE',
                                description: 'The jobs that should have access to purchase the vehicle.',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                },
                                engine: [
                                    'TEAM_CITIZEN', 'TEAM_POLICE', 'TEAM_GANG', 'TEAM_MOB', 'TEAM_GUN', 'TEAM_MEDIC', 'TEAM_CHIEF', 'TEAM_MAYOR', 'TEAM_HOBO', 'TEAM_COOK'
                                ]
                            }
                        }
                    },
                    customcheck: sharedCheck.data
                },
                
                form: $.extend(true, new SparkForm({
                    name: '',
                    model: '',
                    category: '',
                    entity: '',
                    price: '',
                    allowed: '',
                    customcheck: false
                }), this.form, sharedCheck.form),
                
                premade: {
                    //
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\vehicles.lua'
                }
            };
        }
        
    };
    
</script>