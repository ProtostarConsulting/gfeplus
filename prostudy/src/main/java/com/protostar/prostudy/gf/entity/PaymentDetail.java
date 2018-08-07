package com.protostar.prostudy.gf.entity;

import java.util.Date;

public class PaymentDetail {

	
	private String paymentReciptNo;
	public String getPaymentReciptNo() {
		return paymentReciptNo;
	}
	public void setPaymentReciptNo(String paymentReciptNo) {
		this.paymentReciptNo = paymentReciptNo;
	}
	private String payReceivedBy;
	private Date paymentDate;
	private Integer payAmount;
	private Integer tPaid;
	private Integer pAmount;
	private String note;
	
	private String nameOfBank;
	private String branchName;
	private String transactionNumber;
	private Date depositDate;
	
	private boolean paymentReceived = false;
	
		
	public String getPayReceivedBy() {
		return payReceivedBy;
	}
	public void setPayReceivedBy(String payReceivedBy) {
		this.payReceivedBy = payReceivedBy;
	}
	public Date getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}
	public Integer getPayAmount() {
		return payAmount;
	}
	public void setPayAmount(Integer payAmount) {
		this.payAmount = payAmount;
	}
	public Integer gettPaid() {
		return tPaid;
	}
	public void settPaid(Integer tPaid) {
		this.tPaid = tPaid;
	}
	public Integer getpAmount() {
		return pAmount;
	}
	public void setpAmount(Integer pAmount) {
		this.pAmount = pAmount;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getNameOfBank() {
		return nameOfBank;
	}
	public void setNameOfBank(String nameOfBank) {
		this.nameOfBank = nameOfBank;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getTransactionNumber() {
		return transactionNumber;
	}
	public void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
	}
	public Date getDepositDate() {
		return depositDate;
	}
	public void setDepositDate(Date depositDate) {
		this.depositDate = depositDate;
	}
	public boolean isPaymentReceived() {
		return paymentReceived;
	}
	public void setPaymentReceived(boolean paymentReceived) {
		this.paymentReceived = paymentReceived;
	}
}
