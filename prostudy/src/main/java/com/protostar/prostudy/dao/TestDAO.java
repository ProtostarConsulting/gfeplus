package com.protostar.prostudy.dao;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.protostar.prostudy.entity.Car;

public class TestDAO {

	public void testCar() {
		ofy().save().entity(new Car("123123", 1)).now();
		Car c = ofy().load().type(Car.class).id("123123").now();
	}

	public void addCar(Car c) {
		ofy().save().entity(c).now();		
	}
	public List<Car> getCars() {	
		List<Car> cars = ofy().load().type(Car.class).list();
		return cars;
	}
	
	public Car getCar() {		
		Car c = ofy().load().type(Car.class).id("123123").now();
		return c;
	}

}
