function sum(arr){
    return arr.reduce(function(a, b){
        return a + b;
    }, 0);
};

// Functionality to add and remove people
$(document).ready(function() {
    var wrapper = $(".item_container");
    var add_button = $(".add_item_field");

    var count = 1;
    $(add_button).click(function(e) {
        e.preventDefault();
        $(wrapper).append('<div>\n' +
            '<input type="text" name="mytext[]" class="items" placeholder="item">\n' +
            '<input type="text" name="mytext[]" class="cost" placeholder="0.00">\n'  +
            '<input type="text" name="mytext[]" class="people" placeholder="people"> item ' + count + 
            '\n<a href="#" class="delete">Delete</a></div></div>');
        count++;
    });

    $(wrapper).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        count--;
    })
});

// Functionality to calculate who owes how much
$(document).ready(function(){
    var calc_button = $(".calc_cost");
    var ppl_to_cost = {};
    var ppl_to_ind  = {};
    var ind_to_ppl  = {};
    var index = 0;
    
    $(calc_button).click(function(e) {
        e.preventDefault();

        var items = Array.from(document.getElementsByClassName("item"));
        var costs = Array.from(document.getElementsByClassName("cost"));

        for(var i=0; i<costs.length; i++){
            costs[i] = parseFloat(costs[i].value);
        }

        // get dictionary of people
        var people = Array.from(document.getElementsByClassName("people"));

        for(var i=0; i<people.length; i++){
            if(people[i] == undefined){ // skip blanks
                continue;
            }
            var ppl_arr = people[i].value.split(",");
            for(var j=0; j<ppl_arr.length; j++){
                var p = ppl_arr[j].trim();
                // give new people a unique index
                if(p != '' && ppl_to_ind[p] == undefined){
                    ind_to_ppl[index] = p;
                    ppl_to_ind[p] = index++;
                    ppl_to_cost[p] = 0;
                }
            }
        };

        // zero-initialize
        var opt_matrix = [];
        for(var i=0; i<people.length; i++){
            if(people[i] == undefined){
                continue;
            }
            var ppl_arr = people[i].value.split(",");
            var opt     = Array(index).fill(0);
            for(var j=0; j<ppl_arr.length; j++){
                var p = ppl_arr[j].trim();
                if(p == ''){
                    continue;
                }
                opt[ppl_to_ind[p]] = 1;
            };
            opt_matrix.push(opt);
        }

        // TODO: ajax call for python/java/c/anyother language
        var opt_norm = [];
        for(var i=0; i<opt_matrix.length; i++){
            var tmp = sum(opt_matrix[i]);
            var opt = opt_matrix[i].map(function(x){
                return x / tmp;
            });
            opt_norm.push(opt);
        }

        var opt_cost = [];
        for(var i=0; i<costs.length; i++){
            var tmp = opt_norm[i].map(function(x) {
                return x * costs[i];
            });
            opt_cost.push(tmp);
        }

        console.log(opt_cost);

        var totals = [];
        for(var i=0; i<index; i++){
            var tmp = 0;
            for(var j=0; j<opt_cost.length; j++){
                tmp += opt_cost[j][i];
            }
            totals.push(tmp);
        }

        console.log(totals);
        var display = '';
        for(var i=0; i<totals.length; i++){
            display += ind_to_ppl[i] + ": " + totals[i].toFixed(2) + "\n";
        }

        $(".result").text(display);

        
    });
    

})



