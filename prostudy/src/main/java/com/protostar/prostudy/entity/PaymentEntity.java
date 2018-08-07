package com.protostar.prostudy.entity;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class PaymentEntity {
	@Id
	private Long id;
	@Index
	private Long studId;
	private String paymentDescription;
	private int totalFees;
	private String paymentYear;
	private int noofinstallments;
	private List<InstallmentEntity> installments;   
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getStudId() {
		return studId;
	}
	public void setStudId(Long studId) {
		this.studId = studId;
	}
	public int getTotalFees() {
		return totalFees;
	}
	public String getPaymentYear() {
		return paymentYear;
	}
	public void setPaymentYear(String paymentYear) {
		this.paymentYear = paymentYear;
	}
	public String getPaymentDescription() {
		return paymentDescription;
	}
	public void setPaymentDescription(String paymentDescription) {
		this.paymentDescription = paymentDescription;
	}
	public void setTotalFees(int totalFees) {
		this.totalFees = totalFees;
	}
	public int getNoofinstallments() {
		return noofinstallments;
	}
	public void setNoofinstallments(int noofinstallments) {
		this.noofinstallments = noofinstallments;
	}
	public List<InstallmentEntity> getInstallments() {
		return installments;
	}
	public void setInstallments(List<InstallmentEntity> installments) {
		this.installments = installments;
	}
	
	

}
