package com.protostar.prostudy.entity;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Ignore;

@Entity
public class Car {
	@Id
	Long id;
	String vin;
	int color;
	byte[] rawData;
	@Ignore
	int irrelevant;

	private Ref<CarOwner> owner;

	private Ref<CarAddress> carAddress;
	private List<Ref<CarOwner>> previousOwners;

	public Car() {
	}

	public Car(String vin, int color) {
		this.vin = vin;
		this.color = color;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVin() {
		return vin;
	}

	public void setVin(String vin) {
		this.vin = vin;
	}

	public int getColor() {
		return color;
	}

	public void setColor(int color) {
		this.color = color;
	}

	public byte[] getRawData() {
		return rawData;
	}

	public void setRawData(byte[] rawData) {
		this.rawData = rawData;
	}

	public int getIrrelevant() {
		return irrelevant;
	}

	public void setIrrelevant(int irrelevant) {
		this.irrelevant = irrelevant;
	}

	public CarOwner getOwner() {
		return owner.get();
	}

	public void setOwner(CarOwner owner) {
		this.owner = Ref.create(owner);
	}

	public CarAddress getCarAddress() {
		return carAddress.get();
	}

	public void setCarAddress(CarAddress carAddress) {
		this.carAddress = Ref.create(carAddress);
	}

	public List<CarOwner> getPreviousOwners() {
		List<CarOwner> ret = new ArrayList<>();
		Iterator<Ref<CarOwner>> it = previousOwners.iterator();

		while (it.hasNext())
			ret.add(it.next().getValue());
		return ret;
	}

	public void setPreviousOwners(List<CarOwner> previousOwners) {
		Iterator<CarOwner> it = previousOwners.iterator();
		while (it.hasNext())
			this.previousOwners.add(Ref.create(it.next()));

	}

}