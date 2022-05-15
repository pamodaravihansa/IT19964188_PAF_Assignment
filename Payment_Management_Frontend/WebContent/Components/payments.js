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
	var status = validatePaymentForm();
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
			url: "PaymentAPI",
			type: type,
			data: $("#formPayment").serialize(),
			dataType: "text",
			complete: function(response, status) 
			{
				onPaymentSaveComplete(response.responseText, status);
			}
		});
});

//Save
function onPaymentSaveComplete(response, status) {
	if (status == "success") 
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") 
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divPaymentGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error") 
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error") 
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} 
	else 
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	
	$("#hidPaymentIDSave").val("");
	$("#formPayment")[0].reset();
}

//update
$(document).on("click", ".btnUpdate", function(event) {
	$("#hidpaymentIDSave").val($(this).data("itemid"));
	$("#customerName").val($(this).closest("tr").find('td:eq(0)').text());
	$("#unitsConsumed").val($(this).closest("tr").find('td:eq(1)').text());
	$("#chargeForUnits").val($(this).closest("tr").find('td:eq(2)').text());
	$("#adjustments").val($(this).closest("tr").find('td:eq(3)').text());
	$("#totalAmount").val($(this).closest("tr").find('td:eq(4)').text());
	
	
});

//remove
$(document).on("click", ".btnRemove", function(event) {
	$.ajax(
		{
			url: "PaymentApi",
			type: "DELETE",
			data: "inquiryID=" + $(this).data("itemid"),
			dataType: "text",
			complete: function(response, status) {
				onPaymentDeleteComplete(response.responseText, status);
			}
		});
});

//delete
function onPaymentDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted");
			$("#alertSuccess").show();
			$("#divPaymentGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}


//Client model validate form

function validatePaymentForm() {

	// Customer Name
	if ($("#customerName").val().trim() == "") {
		return "Insert Customer Name.";
	}

	// Phone Number-------------------------------
	if ($("#unitsConsumed").val().trim() == "") {
		return "Insert units consumed.";
	}

	// is numerical value for units
	var tmpunitsConsumed = $("#unitsConsumed").val().trim();
	if (!$.isNumeric(tmpunitsConsumed)) {
		return "Insert a numerical value for Units Consumed.";
	}

	//  Adjustments------------------------
	if ($("#adjustments").val().trim() == "") {
		return "Insert Adjustments.";
	}

	return true;
}
