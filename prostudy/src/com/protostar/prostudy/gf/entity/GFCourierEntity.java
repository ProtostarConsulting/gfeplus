package com.protostar.prostudy.gf.entity;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.entity.BaseEntity;

@Entity
public class GFCourierEntity extends BaseEntity{
/*	@Index
	@Id
	private Long id;*/
	private String courierType;
	private String logistics;
	private String registrationID;
	private String courierFrom;
	private String courierTo;
	private String status = "Dispathch";
	private Date courierDispatchDate;
	private Date courierReceivedDate;
	private long instituteID;
	private int bookQty;	
	Ref<PartnerSchoolEntity> schoolName;
	List<GFBookEntity> bookLineItemList;
	@Index
	private String autoGenerated;
	private int totalWeight;
	private float totalFees;
	private String note;
	private String courierName;
	private String courierDocketID;
	private float courierCost;
	private String courierDispatchNotes;
	
	
	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public float getTotalFees() {
		return totalFees;
	}

	public void setTotalFees(float totalFees) {
		this.totalFees = totalFees;
	}

	public int getTotalWeight() {
		return totalWeight;
	}

	public void setTotalWeight(int totalWeight) {
		this.totalWeight = totalWeight;
	}

	public String getAutoGenerated() {
		return autoGenerated;
	}

	public void setAutoGenerated(String autoGenerated) {
		this.autoGenerated = autoGenerated;
	}

	public int getBookQty() {
		return bookQty;
	}

	public void setBookQty(int bookQty) {
		this.bookQty = bookQty;
	}
	
	public List<GFBookEntity> getBookLineItemList() {
		return bookLineItemList;
	}

	public void setBookLineItemList(List<GFBookEntity> bookLineItemList) {
		this.bookLineItemList = bookLineItemList;
	}
	
	public Date getCourierReceivedDate() {
		return courierReceivedDate;
	}
	public void setCourierReceivedDate(Date courierReceivedDate) {
		this.courierReceivedDate = courierReceivedDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getCourierDispatchDate() {
		return courierDispatchDate;
	}
	public void setCourierDispatchDate(Date courierDispatchDate) {
		this.courierDispatchDate = courierDispatchDate;
	}
	public long getInstituteID() {
		return instituteID;
	}
	public void setInstituteID(long instituteID) {
		this.instituteID = instituteID;
	}
	public PartnerSchoolEntity getSchoolName() {
		return schoolName.get();
	}
	public void setSchoolName(PartnerSchoolEntity schoolName) {
		this.schoolName = Ref.create(schoolName);
	}
	/*public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}*/
	public String getCourierType() {
		return courierType;
	}
	public void setCourierType(String courierType) {
		this.courierType = courierType;
	}
	public String getLogistics() {
		return logistics;
	}
	public void setLogistics(String logistics) {
		this.logistics = logistics;
	}
	public String getRegistrationID() {
		return registrationID;
	}
	public void setRegistrationID(String registrationID) {
		this.registrationID = registrationID;
	}
	
	public String getCourierFrom() {
		return courierFrom;
	}
	public void setCourierFrom(String courierFrom) {
		this.courierFrom = courierFrom;
	}
	public String getCourierTo() {
		return courierTo;
	}
	public void setCourierTo(String courierTo) {
		this.courierTo = courierTo;
	}

	public String getCourierName() {
		return courierName;
	}

	public void setCourierName(String courierName) {
		this.courierName = courierName;
	}

	public String getCourierDocketID() {
		return courierDocketID;
	}

	public void setCourierDocketID(String courierDocketID) {
		this.courierDocketID = courierDocketID;
	}

	public float getCourierCost() {
		return courierCost;
	}

	public void setCourierCost(float courierCost) {
		this.courierCost = courierCost;
	}

	public String getCourierDispatchNotes() {
		return courierDispatchNotes;
	}

	public void setCourierDispatchNotes(String courierDispatchNotes) {
		this.courierDispatchNotes = courierDispatchNotes;
	}	
}
