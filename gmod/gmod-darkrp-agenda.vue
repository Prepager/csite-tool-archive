<!-- Template -->
<template><span>DarkRP.createAgenda("{{ form.name }}", {{ curlyList(form.manager) }}, {{ curlyList(form.listeners) }})</span></template>

<!-- Script -->
<script>
    
    // Module
    module.exports = {
        
        mixins: [require('../base')],
        
        data() {
            return {
                key: 'gmod-darkrp-agenda',
                name: 'Agenda Generator',
                short: 'Agenda',
                game: 'gmod',
                mod: 'darkrp',
                language: 'lua',
                
                title: function(form) {
                    return form.name;
                },
                
                outputs: {
                    //
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
                                placeholder: 'E.g. Police agenda',
                                description: 'The name shown in the top left corner of the agenda box.'
                            }
                        }
                    },
                    team: {
                        name: '<b>Team</b> Configuration',
                        inputs: {
                            manager: {
                                name: 'manager',
                                type: 'token',
                                label: 'Manager',
                                required: true,
                                placeholder: 'E.g. TEAM_MAYOR',
                                description: 'The jobs that have access to modify the agenda.',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                },
                                engine: [
                                    'TEAM_CITIZEN', 'TEAM_POLICE', 'TEAM_GANG', 'TEAM_MOB', 'TEAM_GUN', 'TEAM_MEDIC', 'TEAM_CHIEF', 'TEAM_MAYOR', 'TEAM_HOBO', 'TEAM_COOK'
                                ]
                            },
                            listeners: {
                                name: 'listeners',
                                type: 'token',
                                label: 'Listeners',
                                required: true,
                                placeholder: 'E.g. TEAM_CHIEF, TEAM_POLICE',
                                description: 'The jobs that have access to read the agenda.',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                },
                                engine: [
                                    'TEAM_CITIZEN', 'TEAM_POLICE', 'TEAM_GANG', 'TEAM_MOB', 'TEAM_GUN', 'TEAM_MEDIC', 'TEAM_CHIEF', 'TEAM_MAYOR', 'TEAM_HOBO', 'TEAM_COOK'
                                ]
                            }
                        }
                    }
                },
                
                form: $.extend(true, new SparkForm({
                    name: '',
                    manager: '',
                    listeners: '',
                    typeselection: false
                }), this.form),
                
                premade: {
                    gangster: {
                        title: 'Agenda - Gangster\'s agenda',
                        form: {
                            name: 'Gangster\'s agenda',
                            manager: 'TEAM_MOB',
                            listeners: 'TEAM_GANG'
                        }
                    },
                    police: {
                        title: 'Agenda - Police agenda',
                        form: {
                            name: 'Police agenda',
                            manager: 'TEAM_MAYOR, TEAM_CHIEF',
                            listeners: 'TEAM_POLICE'
                        }
                    }
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\agendas.lua'
                }
            };
        }
        
    };
    
</script>