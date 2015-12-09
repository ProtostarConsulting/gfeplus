package com.protostar.billingnstock.invoice.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;
import com.protostar.billnstock.until.data.EMF;
import com.protostar.billnstock.until.data.ServerMsg;

@Api(name = "invoiceService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.services", ownerName = "com.protostar.billingnstock.stock.services", packagePath = ""))
public class InvoiceService {

	@ApiMethod(name = "saveBill")
	public ServerMsg saveBill(InvoiceEntity invoiceEntity) {
		System.out.println("invoiceEntity:" + invoiceEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			em.persist(invoiceEntity);
			msgBean.setMsg("Bill Saved successfully" + " "
					+ invoiceEntity.getCustomerName());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of addTaxServices

	@SuppressWarnings("unchecked")
	@ApiMethod(name = "getAllBills")
	public List<InvoiceEntity> getAllBills() {
		System.out.println("In side getAllBills ");
		List<InvoiceEntity> billList = new ArrayList<InvoiceEntity>();
		EntityManager em = null;
		try {

			em = EMF.get().createEntityManager();

			Query q = em.createQuery("select e from  InvoiceEntity e");
			billList = q.getResultList();
			System.out.println("Got AllBill: " + billList.size());

		} catch (Exception e)

		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return billList;

	}// end of getAllStockServices

	@ApiMethod(name = "getinvoiceByID")
	public InvoiceEntity getCustomerByID(@Named("invoiceId")Long invoiceId) {
		InvoiceEntity invoiceEntity = null;
		EntityManager em = null;
		try {
			em = EMF.get().createEntityManager();
			Query q = em
					.createQuery("select e from InvoiceEntity e where e.invoiceId ="
							+ invoiceId);
			List<InvoiceEntity> resultList = q.getResultList();
			if (resultList.size() > 0) {
				InvoiceEntity customer = resultList.get(0);
		//		invoiceEntity = InvoiceEntityUtil.toInvoiceEntity(customer);
			}

		} finally {
			em.close();
		}
		
		return invoiceEntity;
	}
}// end of StockServices