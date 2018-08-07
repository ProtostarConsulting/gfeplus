package com.protostar.prostudy.entity;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.entity.ScheduledExamEntity;


@Entity
public class ScheduledStudentExamEntity {	

	@Id
	private Long id;
	@Index
	private Ref<UserEntity> stud;
	@Index
	private Ref<ScheduledExamEntity> scheduledExam;	
	@Index
	private Boolean assigned;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public UserEntity getStud() {
		return stud.get();
	}
	public void setStud(UserEntity stud) {
		this.stud = Ref.create(stud);
	}
	public ScheduledExamEntity getScheduledExam() {
		return scheduledExam.get();
	}
	public void setScheduledExam(ScheduledExamEntity scheduledExam) {
		this.scheduledExam = Ref.create(scheduledExam);
	}
	public Boolean getAssigned() {
		return assigned;
	}
	public void setAssigned(Boolean assigned) {
		this.assigned = assigned;
	}
	
	

}
