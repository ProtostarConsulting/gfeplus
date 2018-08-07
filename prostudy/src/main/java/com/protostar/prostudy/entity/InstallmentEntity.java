package com.protostar.prostudy.entity;

import java.util.Date;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class InstallmentEntity {
	@Id
	private String instid;
	private Integer amount;
	private Date date;
	private boolean status;
	private String notes;
	private Date paiddate;
	
	public String getInstid() {
		return instid;
	}
	public void setInstid(String instid) {
		this.instid = instid;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date1) {
		date = date1;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public Date getPaiddate() {
		return paiddate;
	}
	public void setPaiddate(Date paiddate) {
		this.paiddate = paiddate;
	}
		
}
