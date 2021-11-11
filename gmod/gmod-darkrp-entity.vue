<!-- Template -->
<template><span>DarkRP.createEntity("{{ form.name }}", {
    ent = "{{ form.entity}}",
    model = "{{ form.model}}",
    price = {{ form.price }},
    max = {{ form.max }},
    cmd = "{{ form.cmd }}"{{ outputs.category(this, form) }}{{ outputs.allowed(this, form) }}{{ customCheck.template(form) }}
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
                
                key: 'gmod-darkrp-entity',
                name: 'Entity Generator',
                short: 'Entity',
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
                                placeholder: 'E.g. Money Printer',
                                description: 'The name shown in the F4 menu.'
                            },
                            model: {
                                name: 'model',
                                type: 'text',
                                label: 'Model',
                                required: true,
                                placeholder: 'E.g. models/props_c17/consolebox01a.mdl',
                                description: 'The model shown in the F4 menut.'
                            },
                            category: {
                                name: 'category',
                                type: 'text',
                                label: 'Category',
                                required: false,
                                placeholder: 'E.g. Printers',
                                description: 'The category the entity should show up in. (DarkRP 2.6+)'
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
                                placeholder: 'E.g. money_printer',
                                description: 'The entity name (entity folder name).'
                            },
                            cmd: {
                                name: 'cmd',
                                type: 'text',
                                label: 'Command',
                                required: true,
                                placeholder: 'E.g. buymoneyprinter',
                                description: 'The chat command used to purchase the entity (without the \'/\').'
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
                                placeholder: 'E.g. 2500',
                                description: 'The entity price.'
                            },
                            max: {
                                name: 'max',
                                type: 'number',
                                label: 'Max',
                                required: true,
                                placeholder: 'E.g. 2',
                                description: 'The max amount of entities of this type the player can own at the same time.'
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
                                description: 'The jobs that should have access to purchase the entity.',
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
                    cmd: '',
                    max: '',
                    price: '',
                    allowed: '',
                    customcheck: false
                }), this.form, sharedCheck.form),
                
                premade: {
                    drug: {
                        title: 'Entity - Drug lab',
                        form: {
                            name: 'Drug lab',
                            model: 'models/props_lab/crematorcase.mdl',
                            category: '',
                            entity: 'drug_lab',
                            cmd: 'buydruglab',
                            max: 3,
                            price: 400,
                            allowed: 'TEAM_GANG, TEAM_MOB',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    printer: {
                        title: 'Entity - Money printer',
                        form: {
                            name: 'Money printer',
                            model: 'models/props_c17/consolebox01a.mdl',
                            category: '',
                            entity: 'money_printer',
                            cmd: 'buymoneyprinter',
                            max: 2,
                            price: 1000,
                            allowed: '',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    gun: {
                        title: 'Entity - Gun lab',
                        form: {
                            name: 'Gun lab',
                            model: 'models/props_c17/TrapPropeller_Engine.mdl',
                            category: '',
                            entity: 'gunlab',
                            cmd: 'buygunlab',
                            max: 1,
                            price: 500,
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    microwave: {
                        title: 'Entity - Microwave',
                        form: {
                            name: 'Microwave',
                            model: 'models/props/cs_office/microwave.mdl',
                            category: '',
                            entity: 'microwave',
                            cmd: 'buymicrowave',
                            max: 1,
                            price: 400,
                            allowed: 'TEAM_COOK',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    }
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\entities.lua'
                }
            };
        }
        
    };
    
</script>