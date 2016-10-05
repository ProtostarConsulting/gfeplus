package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;




import com.protostar.prostudy.gf.entity.GFCourierEntity;

/**
 * Servlet implementation class DownloadCourierReport
 */
public class DownloadCourierDispatchReport extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadCourierDispatchReport() {
        super();
       
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("hi i am download servlet");
		//String courierType=String.valueOf(request.getParameter("CourierType"));
		
		int sr_no=0;
		
		String courierDispatchReportID=request.getParameter("courierDispatchReportByInstituteID");
		
		long courierReportInstituteID=Long.parseLong(courierDispatchReportID);
		
		String dispatchDate=request.getParameter("dispatchDate");
		
		String DATE_FORMAT = "dd-MM-yyyy";
		
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		
		TimeZone timeZone=TimeZone.getTimeZone("IST");
		sdf.setTimeZone(timeZone);
		
		Date courierDispatchDate=new Date(Long.parseLong(dispatchDate));
		
		System.out.println("*****courierDispatchDate:"+courierDispatchDate);
		
		String dispachDateToCompare = sdf.format(courierDispatchDate);	
				
		System.out.println("dispachDateToCompare: ----"+dispachDateToCompare);
		
		GFCourierService gfCourierService = new GFCourierService();
		List<GFCourierEntity> courierReportList = gfCourierService.getGFCourierByInstitute(courierReportInstituteID);
		
		/*Date dispatchDateofCourier = courierReportList.get(0).getCourierDispatchDate();
		System.out.println("dispatchDateofCourier: ----"+dispatchDateofCourier);*/
		
		//if(dispachDateToCompare.equals(dispatchDateofCourier)){}
		
		try {
			
			response.setContentType("text/csv");
			response.setHeader("Content-Disposition",
					"attachment; filename=CourierDispatchReportData_"+sdf.format(new Date())+".csv");
			
			ServletOutputStream outputStream = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream);
			
			writer.append("Sr. No.");
			writer.append(',');
			writer.append("Reg. No.");
			writer.append(',');
			writer.append("School/College Name");
			writer.append(',');
			writer.append("Co ordinator");
			writer.append(',');
			writer.append("Mobile");
			writer.append(',');
			writer.append("Destination(From - To)");
			writer.append(',');
			writer.append("Courier Dispatch Date");
			writer.append(',');
			writer.append("Logistic");
			writer.append(',');
			writer.append("Docket No.");
			writer.append(',');
			writer.append("Weight(Kg)");
			writer.append(',');
			writer.append("Courier Cost(Rs.)");
			writer.append(',');
			
			writer.append(System.lineSeparator());
			
			for(int i=0;i<courierReportList.size();i++){
				GFCourierEntity gfCourierEntity = courierReportList.get(i);
				if(dispachDateToCompare.equals(sdf.format(gfCourierEntity.getCourierDispatchDate()))){
								
				String serial_no=Integer.toString(++sr_no);
				writer.append(serial_no);
				writer.append(',');
				String reg_no = gfCourierEntity.getAutoGenerated();
				writer.append(reg_no);
				writer.append(',');
				String schoolName = gfCourierEntity.getSchoolName().getSchoolName();
				writer.append(schoolName);
				writer.append(',');
				String coordinatorName = gfCourierEntity.getSchoolName().getContactDetail().getCoordinatorDetail().get(0).getCoordinatorName();
				writer.append(coordinatorName);
				writer.append(',');
				String coordinatorMobNo = gfCourierEntity.getSchoolName().getContactDetail().getCoordinatorDetail().get(0).getCoordinatorMobileNum();
				writer.append(coordinatorMobNo);
				writer.append(',');
				String courierDestination = gfCourierEntity.getSchoolName().getAddress().getCity()+"  -  "+gfCourierEntity.getSchoolName().getAddress().getDist();
				//System.out.println("*****courierDestination"+courierDestination);
				writer.append(courierDestination);
				writer.append(',');
				String dispachDateToCourier = sdf.format(courierDispatchDate);
				//System.out.println("*****dispachDateToCourier"+dispachDateToCourier);
				writer.append(dispachDateToCourier);
				writer.append(',');
				String logistics = gfCourierEntity.getLogistics();
				writer.append(logistics);
				writer.append(',');
				String courierDocketNo = gfCourierEntity.getCourierDocketID();
				writer.append(courierDocketNo);
				writer.append(',');
				int courierWeight1 = gfCourierEntity.getTotalWeight();
				String courierWeight=Integer.toString(courierWeight1);
				writer.append(courierWeight);
				writer.append(',');
				float courierCost1 = gfCourierEntity.getCourierCost();
				String courierCost=Float.toString(courierCost1);
				writer.append(courierCost);
				writer.append(',');
				
				writer.append(System.lineSeparator());
				
				}
				
				
			}
			writer.close();
						
		} 
		catch (Exception e) {
			throw new ServletException("Exception in Excel Sample Servlet", e);
		}
		
	}
}
