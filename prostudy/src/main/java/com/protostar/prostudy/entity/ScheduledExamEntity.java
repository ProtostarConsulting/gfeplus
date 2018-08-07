package com.protostar.prostudy.entity;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class ScheduledExamEntity {

	@Id
	private Long id;
	@Index
	private String examtitle;
	
	private String desc;
	private Date startdatentime;
	private Date enddatentime;	
	private int duration;
	@Index
	private Long instituteID;
	private List<ScheduledQuestionEntity> listOfQuestion;
	
	public Long getId() {
		return id;
	}	
	public void setId(Long id) {
		this.id = id;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	
	
	public Date getStartdatentime() {
		return startdatentime;
	}
	public void setStartdatentime(Date startdatentime) {
		this.startdatentime = startdatentime;
	}
	public Date getEnddatentime() {
		return enddatentime;
	}
	public void setEnddatentime(Date enddatentime) {
		this.enddatentime = enddatentime;
	}
	public String getExamtitle() {
		return examtitle;
	}
	public void setExamtitle(String examtitle) {
		this.examtitle = examtitle;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	
	public Long getInstituteID() {
		return instituteID;
	}
	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}
	public List<ScheduledQuestionEntity> getListOfQuestion() {
		return listOfQuestion;
	}
	public void setListOfQuestion(List<ScheduledQuestionEntity> listOfQuestion) {
		this.listOfQuestion = listOfQuestion;
	}
	
	
	}
