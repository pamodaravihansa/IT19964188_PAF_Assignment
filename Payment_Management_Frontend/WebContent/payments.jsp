<%@ page import="com.Payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
	
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payments Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/payments.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Payment Management </h1>
				
				<form id="formPayment" name="formPayment">
				
					Customer Name: 
					<input id="customerName" name="customerName" type="text" class="form-control form-control-sm"> <br> 
					
					Units Consumed:
					<input id="unitsConsumed" name="unitsConsumed" type="text" class="form-control form-control-sm"> <br> 
					
					Charge for units: 
					<input id="chargeForUnits" name="chargeForUnits" type="text" class="form-control form-control-sm"> <br> 
					
					Adjustments: 
					<input id="adjustments" name="adjustments" type="text" class="form-control form-control-sm"> <br>
					
					Total Amount: 
					<input id="totalAmount" name="totalAmount" type="text" class="form-control form-control-sm"> <br> 
										
					
					<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary"> 
					<input type="hidden" id="hidPaymentIDSave" name="hidPaymentIDSave" value="">
					
				</form>
				
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divComplaintsGrid">
					<%
					Payment paymentObj = new Payment();
					out.print(paymentObj.readPayments());
					%>
				</div>
			</div>
		</div>
	</div>
</body>
</html>