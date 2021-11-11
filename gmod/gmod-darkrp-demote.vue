<!-- Template -->
<template><span>DarkRP.createDemoteGroup("{{ form.name }}", {{ curlyList(form.jobs) }})</span></template>

<!-- Script -->
<script>

    // Module
    module.exports = {
        
        mixins: [require('../base')],
        
        data() {
            return {
                key: 'gmod-darkrp-demote',
                name: 'Demote Group Generator',
                short: 'Demote Group',
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
                        center: true,
                        inputs: {
                            name: {
                                name: 'name',
                                type: 'text',
                                label: 'Name',
                                required: true,
                                placeholder: 'E.g. Cops',
                                description: 'The name shown in the demote notice.'
                            },
                            jobs: {
                                name: 'jobs',
                                type: 'token',
                                label: 'Jobs',
                                required: true,
                                placeholder: 'E.g. TEAM_CHIEF, TEAM_POLICE',
                                description: 'The job(s) the player should be banned from.',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                },
                                engine: [
                                    'TEAM_CITIZEN', 'TEAM_POLICE', 'TEAM_GANG', 'TEAM_MOB', 'TEAM_GUN', 'TEAM_MEDIC', 'TEAM_CHIEF', 'TEAM_MAYOR', 'TEAM_HOBO', 'TEAM_COOK'
                                ]
                            },
                        }
                    }
                },
                
                form: $.extend(true, new SparkForm({
                    name: '',
                    jobs: ''
                }), this.form),
                
                premade: {
                    police: {
                        title: 'Demote Group - Cops',
                        form: {
                            name: 'Cops',
                            jobs: 'TEAM_POLICE, TEAM_CHIEF',
                        }
                    },
                    gundealer: {
                        title: 'Demote Group - Gangsters',
                        form: {
                            name: 'Gangsters',
                            jobs: 'TEAM_GANG, TEAM_MOB',
                        }
                    }
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\demotegroups.lua'
                }
            };
        }
        
    };
    
</script>