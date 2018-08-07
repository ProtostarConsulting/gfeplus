package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;


@Entity
public class AdminEntity {
	@Id
	private Long id;
	private String admin_name;
	private String admin_email_id;
	private String admin_contact_no;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAdmin_name() {
		return admin_name;
	}
	public void setAdmin_name(String admin_name) {
		this.admin_name = admin_name;
	}
	public String getAdmin_email_id() {
		return admin_email_id;
	}
	public void setAdmin_email_id(String admin_email_id) {
		this.admin_email_id = admin_email_id;
	}
	public String getAdmin_contact_no() {
		return admin_contact_no;
	}
	public void setAdmin_contact_no(String admin_contact_no) {
		this.admin_contact_no = admin_contact_no;
	}
	
	
}


