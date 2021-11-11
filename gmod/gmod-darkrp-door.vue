<!-- Template -->
<template><span>DarkRP.createEntityGroup("{{ form.name }}", {{ form.jobs }})</span></template>

<!-- Script -->
<script>

    // Module
    module.exports = {
        
        mixins: [require('../base')],
        
        data() {
            return {
                key: 'gmod-darkrp-door',
                name: 'Door Group Generator',
                short: 'Door Group',
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
                                placeholder: 'E.g. Cops and Mayor only',
                                description: 'The name shown on the doors when applied.'
                            },
                            jobs: {
                                name: 'jobs',
                                type: 'token',
                                label: 'Jobs',
                                required: true,
                                placeholder: 'E.g. TEAM_CHIEF, TEAM_POLICE',
                                description: 'The job(s) that should have access to lock and unlock the doors.',
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
                        title: 'Door Group - Cops and Mayor only',
                        form: {
                            name: 'Cops and Mayor only',
                            jobs: 'TEAM_CHIEF, TEAM_POLICE, TEAM_MAYOR',
                        }
                    },
                    gundealer: {
                        title: 'Door Group - Gundealer only',
                        form: {
                            name: 'Gundealer only',
                            jobs: 'TEAM_GUN',
                        }
                    }
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\doorgroups.lua'
                }
            };
        }
        
    };
    
</script>