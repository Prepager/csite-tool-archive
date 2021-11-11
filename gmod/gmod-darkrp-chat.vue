<!-- Template -->
<template><span>DarkRP.createGroupChat({{ form.jobs }})</span></template>

<!-- Script -->
<script>

    // Module
    module.exports = {
        
        mixins: [require('../base')],
        
        data() {
            return {
                key: 'gmod-darkrp-chat',
                name: 'Chat Group Generator',
                short: 'Chat Group',
                game: 'gmod',
                mod: 'darkrp',
                language: 'lua',
                
                title: function(form) {
                    return form.jobs;
                },
                
                outputs: {
                    //
                },
                
                categories: {
                    base: {
                        name: '<b>Base</b> Configuration',
                        center: true,
                        inputs: {
                            jobs: {
                                name: 'jobs',
                                type: 'token',
                                label: 'Jobs',
                                required: true,
                                placeholder: 'E.g. TEAM_CHIEF, TEAM_POLICE',
                                description: 'The job(s) that should have access to the chat.',
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
                    jobs: ''
                }), this.form),
                
                premade: {
                    gang: {
                        title: 'Chat Group - Gangster',
                        form: {
                            jobs: 'TEAM_MOB, TEAM_GANG'
                        }
                    }
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\groupchats.lua'
                }
            };
        }
        
    };
    
</script>