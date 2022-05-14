$(document).ready(function()
{
	$("#alertSuccess").hide();
	$("#alertError").hide();
});

//Save ==================================
$(document).on("click", "#btnSave", function(event) 
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form validation-------------------
	var status = validateComplaintForm();
	if (status != true) 
	{
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	
	// If valid------------------------
	var type = ($("#hidPaymentIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
		{
			url: "PaymentsAPI",
			type: type,
			data: $("#formPayment").serialize(),
			dataType: "text",
			complete: function(response, status) 
			{
				onComplaintSaveComplete(response.responseText, status);
			}
		});
});