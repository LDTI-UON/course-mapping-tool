var CourseMapperView = Backbone.View.extend({
	 initialize: function () {
	        Backbone.View.prototype.initialize.apply(this);
	 },
	 deleteCallback: {},
	 setDeleteAction: function(callback) {
		this.deleteCallback = callback; 
	 },
	 deleteDialog: function(header, message) {
		 $("#confirm-delete").remove();
		 
		 if($("#confirm-delete").length == 0) {
			 var dial = _.template($("#modalDialog").html());
			 $("#controls").append(dial({message: message, header: header}));
		 }
		 var me = this;
		 
		 var modal = function(e) {
				$("#confirm-delete .modal-header").html(header);
				$("#confirm-delete .modal-body").html(message);
				
				$("#confirm-delete .btn-ok").click(function(e) {
					me.deleteCallback();
					$("#confirm-delete").modal('hide');
				});
		};
		
       // alert($('#controls #confirm-delete').length);
         
         $('#controls #confirm-delete').off('shown.bs.modal').on('shown.bs.modal', modal);
	 },
     genericDialog: function(header, message) {
         $("#alert-message").remove();

          if($("#alert-message").length == 0) {
			 var dial = _.template($("#modalDialogOK").html());
			 $("#controls").append(dial({message: message, header: header}));
              $("#alert-message").modal('show');
		 }
         var modal = function(e) {
				$("#alert-message .modal-header").html(header);
				$("#alert-message .modal-body").html(message);

			/*	$("#confirm-delete .btn-ok").click(function(e) {
					$("#confirm-delete").modal('hide');
				});*/
		};

         $('#controls #alert-message').off('show.bs.modal').on('show.bs.modal', modal);
     },
	 validationCheck: function(field, targetEl, options) { // front end validation feedback
		   	options = options || {};
		   	
			$(targetEl).parent().removeClass("has-error has-success has-warning").find(".help-block").remove();
			
			var param = {}; 
			if(typeof options.divide !== 'undefined') {
				param[field] = $(targetEl).val() / options.divide;
			} else {
				param[field] = $(targetEl).val();
			}
			
			var invalidFields = this.model.validate(param); 
				
				if(typeof invalidFields !== 'undefined' && invalidFields.length > 0) {
						var feedback = invalidFields[0];
						var $input = $(targetEl);
									
						$input.parent().addClass("has-error");
						$input.after("<span class='help-block'>"+feedback.message+"</span>");
				} else {
					$(targetEl).parent().addClass("has-success");
				}
		
		this.model.set(param);
		
		if(this.model.isValid()) {
			this.model.save();
		}
		
		return;
	},
	buildPredefOptions: function(_options, match) {
		var dom_options = "";
		$(_options).each(function() {
			var opt = "<option ";
			if(match == this) {
				opt += "selected";
			}
			
			opt += ">"+this+"</option>\n";
			
			dom_options += opt;
		});
		
		return dom_options;
	},
	buildLearningOutcomeOptions: function() {
		var options = "";

		var outcomes = this.model.get("learning_outcomes");
	
		if(outcomes.length == 0) {
			outcomes = [];
		}

		this.model.extra.allLearningOutcomes.each(function(o) {
			var id = o.get("id");
			var name = o.get("name");
			
			var opt = "<option value='"+id+"'";
			if(outcomes.indexOf(o.id) != -1) {
				opt += "selected";
			}
			
			opt += ">"+name+"</option>\n";
			
			options += opt;
		});

		delete this.model.extra;

		return options;
},
});
