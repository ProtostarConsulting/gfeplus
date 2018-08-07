package com.protostar.prostudy.gf.entity;

import java.util.Date;

import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.entity.BaseEntity;

@Entity
@Cache
public class GFBook extends BaseEntity {

	/*
	 * @Id private Long id;
	 */
	@Index
	private String bookName;
	private String bookAuther;
	private double weight;
	private int bookPrice;
	private int bookQty;
	private String bookPublication;
	private Date bookFeedDate;
	@Index
	private long instituteID;
	@Index
	private String bookMedium;
	private Date stockFeedDate;
	private Date stockModifiedDate;
	private int bookThreshold;
	private String standard;
	private String flag;

	// Ref<PartnerSchoolEntity> schoolName;

	public long getInstituteID() {
		return instituteID;
	}

	public String getFlag() {
		return flag;
	}

	public Date getStockModifiedDate() {
		return stockModifiedDate;
	}

	public void setStockModifiedDate(Date stockModifiedDate) {
		this.stockModifiedDate = stockModifiedDate;
	}

	public int getBookThreshold() {
		return bookThreshold;
	}

	public void setBookThreshold(int bookThreshold) {
		this.bookThreshold = bookThreshold;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getStandard() {
		return standard;
	}

	public void setStandard(String standard) {
		this.standard = standard;
	}

	public Date getBookFeedDate() {
		return bookFeedDate;
	}

	public void setBookFeedDate(Date bookFeedDate) {
		this.bookFeedDate = bookFeedDate;
	}

	public String getBookMedium() {
		return bookMedium;
	}

	public void setBookMedium(String bookMedium) {
		this.bookMedium = bookMedium;
	}

	public Date getStockFeedDate() {
		return stockFeedDate;
	}

	public void setStockFeedDate(Date stockFeedDate) {
		this.stockFeedDate = stockFeedDate;
	}

	public int getBookQty() {
		return bookQty;
	}

	public void setBookQty(int bookQty) {
		this.bookQty = bookQty;
	}

	public void setInstituteID(long instituteID) {
		this.instituteID = instituteID;
	}

	/*
	 * public Long getId() { return id; }
	 * 
	 * public void setId(Long id) { this.id = id; }
	 */

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getBookAuther() {
		return bookAuther;
	}

	public void setBookAuther(String bookAuther) {
		this.bookAuther = bookAuther;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public int getBookPrice() {
		return bookPrice;
	}

	public void setBookPrice(int bookPrice) {
		this.bookPrice = bookPrice;
	}

	public String getBookPublication() {
		return bookPublication;
	}

	public void setBookPublication(String bookPublication) {
		this.bookPublication = bookPublication;
	}

}
