module.exports = {
    
    // Form
    form: {
        customcheck: false,
        
        check_display: '',
        check_message: '',
        check_type: '',
        check_jobs: '',
        check_admin: '',
        check_groups: '',
        check_steamids: ''
    },
    
    // Data
    data: {
        name: '<b>CustomCheck</b> Configuration <small>(Restrict access)</small>',
        inputs: {
            // Default
            check_display: {
                name: 'check_display',
                type: 'select',
                label: 'Visibility',
                required: function(form) {
                    return (form.customcheck == null || form.customcheck);
                },
                description: 'The visibility of item in the F4 menu.',
                options: {
                    'return': 'Restricted to players that can pass the check.',
                    'return CLIENT or': 'Visible for everyone.'
                }
            },
            check_message: {
                name: 'check_message',
                type: 'text',
                label: 'Message',
                required: false,
                placeholder: 'E.g. This job is donator only!',
                description: 'The message shown if the player can\'t pass the customCheck.'
            },
            check_type: {
                name: 'check_type',
                type: 'select',
                label: 'Method',
                required: function(form) {
                    return (form.customcheck == null || form.customcheck);
                },
                description: 'The restriction method you want to use.',
                options: {
                    'jobs': 'Jobs',
                    'groups': 'Groups',
                    'steamids': 'SteamIDs'
                }
            },
            
            // Jobs
            check_jobs: {
                name: 'check_jobs',
                type: 'token',
                label: 'Jobs',
                required: false,
                placeholder: 'E.g. TEAM_CHIEF, TEAM_POLICE',
                description: 'The teams the item should be restricted to.',
                replacement: {
                    quotes: false,
                    spaces: false
                },
                engine: [
                    'TEAM_CITIZEN', 'TEAM_POLICE', 'TEAM_GANG', 'TEAM_MOB', 'TEAM_GUN', 'TEAM_MEDIC', 'TEAM_CHIEF', 'TEAM_MAYOR', 'TEAM_HOBO', 'TEAM_COOK'
                ],
                active: function(form) {
                    return form.check_type == 'jobs';
                }
            },
            
            // Groups
            check_admin: {
                name: 'check_admin',
                type: 'select',
                label: 'Admin System',
                required: function(form) {
                    return (form.customcheck == null || form.customcheck) && form.check_type == 'groups';
                },
                description: 'The admin system you are running on your server.',
                options: {
                    'ply:GetNWString("usergroup")': 'ULX, FAdmin & More',
                    'serverguard.player:GetRank(ply)': 'ServerGuard'
                },
                active: function(form) {
                    return form.check_type == 'groups';
                }
            },
            check_groups: {
                name: 'check_groups',
                type: 'token',
                label: 'Groups',
                required: false,
                placeholder: 'E.g. "superadmin", "admin", "donator"',
                description: 'The groups the item should be restricted to.',
                replacement: {
                    quotes: true,
                    spaces: true
                },
                engine: [
                    'superadmin', 'admin', 'operator'
                ],
                active: function(form) {
                    return form.check_type == 'groups';
                }
            },
            
            // SteamIDs
            check_steamids: {
                name: 'check_steamids',
                type: 'token',
                label: 'SteamIDs',
                required: false,
                placeholder: 'E.g. "STEAM_0:1:7099", "STEAM_0:0:28454957"',
                description: 'The SteamIDs the item should be restricted to.',
                replacement: {
                    quotes: true,
                    spaces: false
                },
                active: function(form) {
                    return form.check_type == 'steamids';
                }
            },
            
        },
        hiddenKey: 'customcheck'
    },
    
    // Template
    template(form) {
        // Variables
        var tab = '    ';
        
        // Disabled
        if(form[this.data.hiddenKey] == false) {
            return '';
        }
        
        // Undefined
        function udef(value) {
            return (value == undefined ? '' : value);
        }
        
        // Return
        var returnValue = ',';
        returnValue += '\n'+tab+'customCheck = function(ply) '+udef(form.check_display);
        
        returnValue += '\n'+tab+tab;
        switch(form.check_type) {
            case 'jobs':
                returnValue += 'table.HasValue({'+udef(form.check_jobs)+'}, ply:Team())';
                break;
            case 'groups':
                returnValue += 'table.HasValue({'+udef(form.check_groups)+'}, '+form.check_admin+')';
                break;
            case 'steamids':
                returnValue += 'table.HasValue({'+udef(form.check_steamids)+'}, ply:SteamID())';
                break;
        };
        
        returnValue += '\n'+tab+'end,';
        
        // Message
        returnValue +='\n'+tab+'CustomCheckFailMsg = "'+udef(form.check_message)+'",';
        
        // Return
        return returnValue;
    }
    
};