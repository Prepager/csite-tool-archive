// Export
module.exports = {
    
    data() {
        return {
            form: new SparkForm({
                id: 0,
                error: 0,
                collection_id: 0,
                
                tool: '',
                code: ''
            })
        };
    },
    
    mounted() {
        // Dispatch
        this.dispatchData();
    },
    
    methods: {
        // udef
        udef(value) {
            return (value == undefined ? '' : value);
        },
        
        // udefHide
        udefHide(form, value, tab = true) {
            return (this.udef(form) != ''
                ? (tab ? ',\n    '+value(form) : value(form))
                : ''
            );
        },
        
        // curlyList
        curlyList(value, pretty = false) {
            // Variables
            var returnValue = '';
            var tab = '    ';
            var notSingle = false;
            
            if(pretty) {
                var singleMatch = this.udef(value).match(/,/g);
                notSingle = singleMatch != null && singleMatch.length >= 1 && pretty;
            }
            
            // Value
            returnValue += '{'+(notSingle ? '\n'+tab+tab : '');
            returnValue += (!pretty ? this.udef(value) : this.udef(value).replace(/, /g, ',\n'+tab+tab));
            returnValue += (notSingle ? '\n'+tab : '')+'}';
            
            // Return
            return returnValue;
        },
        
        // dispatchData
        dispatchData() {
            Bus.$emit('tool-data', this.$data);
        },
        
        // luaColor
        luaColor(value, event) {
            var colorTable = event.color.toRGB();
            var colorValue = 'Color(%r, %g, %b, 255)';
            
            $.each(['r', 'g', 'b'], function(index, value) {
                colorValue = colorValue.replace('%'+value, colorTable[value]);
            });
            
            return colorValue;
        },
        
        // luaColorWatch
        luaColorWatch(value) {
            var colorPattern = 'Color\\(([0-9]{1,3}), ([0-9]{1,3}), ([0-9]{1,3}), 255\\)';
            var colorMatches = value.match(new RegExp(colorPattern))
            if(!colorMatches || colorMatches.length < 4) { return value; }
            
            return 'rgb('+colorMatches[1]+', '+colorMatches[2]+', '+colorMatches[3]+')';
        }
    },
    
    created() {
        // Variables
        var vm = this;
        
        // tool-form
        Bus.$on('tool-form', function(form) {
            vm.form = form;
        });
    }
    
};