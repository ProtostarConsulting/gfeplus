package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;


@Entity
public class TeacherEntity {
	@Id
	private Long id;
	private String teacher_name;
	private String teacher_email_id;
	private String teacher_contact_no;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTeacher_name() {
		return teacher_name;
	}
	public void setTeacher_name(String teacher_name) {
		this.teacher_name = teacher_name;
	}
	public String getTeacher_email_id() {
		return teacher_email_id;
	}
	public void setTeacher_email_id(String teacher_email_id) {
		this.teacher_email_id = teacher_email_id;
	}
	public String getTeacher_contact_no() {
		return teacher_contact_no;
	}
	public void setTeacher_contact_no(String teacher_contact_no) {
		this.teacher_contact_no = teacher_contact_no;
	}
	
	
	
}


