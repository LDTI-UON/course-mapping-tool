var app = app || {};

app.summaryTable = CourseMapperView.extend({
	tagName: "tbody",
	initialize: function(options) {
		this.learningActivities = options.learningActivities;
		this.assessments = options.assessments;
	},
    render: function() {
    	this.$el.html("");
    	this.collection.each(this.addLearningOutcome, this);

        var total_weight = 0;

        this.assessments.each(function(v) {
            total_weight += parseFloat(v.get("weight"));
        });

        var str_weight = (total_weight * 100).toFixed();

        if(total_weight < 1.0) {
               $("#summary thead th:nth-child(3)").css("background-color", "lightyellow").
               append("<br><span style='font-size: 8pt; color: #A91B0C;'>Note: Assessments only total "+str_weight+"%</span>");
        } else if(total_weight > 1.0) {
                $("#summary thead th:nth-child(3)").css("background-color", "lightyellow").
               append("<br><span style='font-size: 8pt; color: #A91B0C;'>Note: Assessments total "+str_weight+"%</span>");
        }

    	return this;
    },
    checkOutcomeMappings: function(assessments, learningActivities, $output) {
    	$output.find('help-block').remove();
    	$output.parent().removeClass('danger');
    	var str_raw = "<span class='form-group has-error'><span class='help-block'>This learning outcome has no %n%</span></span>";



    	if(assessments.length === 0) {
    		var str = str_raw.replace("%n%", "assessments.");
    		$output.append(str);
    		$output.parent().addClass('danger');
    	}
    	if(learningActivities.length === 0) {
    		var str = str_raw.replace("%n%", "learning activities.");
    		$output.append(str);
    		$output.parent().addClass('danger');
    		$output.parent().next("tr").find("td:not([colspan])").parent().addClass('danger');
    	}
    	
    	if(assessments.length > 0 && learningActivities.length > 0) {
    		$output.parent().addClass('success');
    		$output.parent().next("tr").find("td:not([colspan])").parent().addClass('success');
    	}
    	
    },
    addLearningOutcome: function(learningOutcome) {
    	var assessments = this.assessments.byLearningOutcomeId(learningOutcome.id);
    	var learningActivities = this.learningActivities.byLearningOutcomeId(learningOutcome.id);
    	
    	var rowspan = assessments.length > learningActivities.length ? 
    						assessments.length : learningActivities.length;
    	
    	var longer;
    	var str_empty_row = "<tr><td></td><td></td></tr>";
    	
    	this.$el.append(str_empty_row);
    	
    	var start = this.$el.find("tr").length > 0 ? this.$el.find("tr").length - 1 : 0;
    	var origstart = start;
    	
    	var i = start;
    	
    	var addRow = function(i, context) {
    		if(i == start) {
    			context.$el.find("tr:eq("+i+")").append("<td></td>");
    			context.$el.find("tr:eq("+i+") td:eq(0)").attr("rowspan", rowspan);
    			context.$el.find("tr:eq("+i+") td:eq(0)").text(learningOutcome.get("name"));
    		} else {
    			context.$el.append(str_empty_row);
    		}
    	};
    	
    	if(rowspan > 0) {
    		longer = assessments.length > learningActivities.length ? assessments : learningActivities;
    	
	    	longer.each(function() {
	    		addRow(i, this);
	    		i = i + 1;
	    	}, this);
    	
    	} else {
    			addRow(i, this);
    	}
    	
    	i = start;
    	learningActivities.each(function(learningActivity) { 
    		var tdi = 0;
    		if(i == start) {
    			tdi = 1;
    		}
    		
    		this.$el.find("tr:eq("+i+") td:eq("+tdi+")").html("<article><p>"+learningActivity.get("name")+"</p><strong>Week: </strong>"+learningActivity.get("week")+"<strong><br>Context: </strong>"+learningActivity.get("type")+ "</article>");
    		
    		i = i + 1;
    	}, this);
    	
    	i = start;
    	assessments.each(function(assessment) { 
    		var tdi = 1;
    		if(i == start) {
    			tdi = 2;
    		}	
    		var week = assessment.get("week");
    		var label = "<strong>Due:</strong> Week ";
    		if(week.indexOf("_") !== -1) {
    			var a = week.split("_");
    			week = a[0] + " - " + a[1]; 
    			label = "Weeks: ";
    		}
    		if(week === "ongoing") {
    			label = "";
    			week = "Ongoing formative"
    		}

            var weight = (parseFloat(assessment.get("weight")) * 100).toFixed();

    		this.$el.find("tr:eq("+i+") td:eq("+tdi+")").html("<article><p>"+assessment.get("name")+"</p>"+label+week+" <br><strong>Type: </strong> "+assessment.get("type")+"<br><strong>Weight: </strong> "+weight+"%</article>");
    		
    		i = i + 1;
    	}, this);
    	
    	this.checkOutcomeMappings(assessments, learningActivities, this.$el.find("tr:eq("+origstart+") td:eq(0)"));
    }
});
