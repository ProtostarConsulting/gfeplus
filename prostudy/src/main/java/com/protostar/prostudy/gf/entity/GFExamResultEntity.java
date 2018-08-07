package com.protostar.prostudy.gf.entity;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.entity.BaseEntity;
import com.protostar.prostudy.entity.PracticeExamResultEntity;

@Entity
@Cache
public class GFExamResultEntity extends BaseEntity {
	private String studName;
	@Index
	private String examYear;
	@Index
	private String standard;
	private String mediumOfAnswer;
	@Index
	private float marks;
	@Index
	private boolean grfReviewed = false;

	@Index
	private Ref<PartnerSchoolEntity> school;
	@Index
	private Ref<PracticeExamResultEntity> examResult;

	public String getStandard() {
		return standard;
	}

	public void setStandard(String standard) {
		this.standard = standard;
	}

	public String getMediumOfAnswer() {
		return mediumOfAnswer;
	}

	public void setMediumOfAnswer(String mediumOfAnswer) {
		this.mediumOfAnswer = mediumOfAnswer;
	}

	public PartnerSchoolEntity getSchool() {
		return school == null ? null : school.get();
	}

	public void setSchool(PartnerSchoolEntity school) {
		this.school = Ref.create(school);
	}

	public String getExamYear() {
		return examYear;
	}

	public void setExamYear(String examYear) {
		this.examYear = examYear;
	}

	public float getMarks() {
		return marks;
	}

	public void setMarks(float marks) {
		this.marks = marks;
	}

	public String getStudName() {
		return studName;
	}

	public void setStudName(String studName) {
		this.studName = studName;
	}

	public boolean isGrfReviewed() {
		return grfReviewed;
	}

	public void setGrfReviewed(boolean grfReviewed) {
		this.grfReviewed = grfReviewed;
	}

	public PracticeExamResultEntity getExamResult() {
		return examResult == null ? null : examResult.get();
	}

	public void setExamResult(PracticeExamResultEntity examResult) {
		this.examResult = Ref.create(examResult);
	}
}
