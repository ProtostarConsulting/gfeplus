import { Component, Optional, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { courierTypelist, logisticsList } from '../core/constant.app';
import { PartnerSchool, ExamDetail, BookDetail, BookSummary } from '../partnerschool/partner-school';
import { PartnerSchoolService } from '../partnerschool/school.service';
import { CourierSerivces, GFCourier } from './courier.service';
import { GFBookStockService, GFBook } from '../gfbook/gfbook.service';

import { RouteData } from '../route-data.provider';

@Component({
    moduleId: module.id,
    selector: 'proerp-add-courier-fromPS',
    templateUrl: './gfCourier_directAddFromPS.html',
    styleUrls: ['./feature.component.css']
})

export class AddCourierFromPSComponent {

    school: PartnerSchool;
    yearOfExam: string;
    bookStocks: Array<GFBook>;
    courierTypelist: string[];
    logisticsList: string[];
    tempPartnerSchool: any;
    newCourierObj: GFCourier = new GFCourier();
    courierDispatchDate: Date = new Date();
    bookDetail: Array<BookDetail>;
    schoolist: Array<PartnerSchool>;
    bookSummary: BookSummary;
    name: string;

    dialogRef: MdDialogRef<any>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private routeData: RouteData,
        private courierservice: CourierSerivces,
        private partnerschoolservice: PartnerSchoolService,
        private gfbookService: GFBookStockService,
        public dialog: MdDialog,
        public viewContainerRef: ViewContainerRef
    ) {
        this.courierTypelist = courierTypelist;
        this.logisticsList = logisticsList;
        this.newCourierObj.bookLineItemList = [];
        this.tempPartnerSchool = {
            examDetailList: ExamDetail
        };
    }

    ngOnInit() {
        if (this.routeData.params.selectedSchool != undefined
            && this.routeData.params.yearOfExam != undefined) {
            this.school = this.routeData.params.selectedSchool;
            this.name = this.school.schoolName;
            this.yearOfExam = this.routeData.params.yearOfExam;
            this.newCourierObj.courierFrom = "Protostar, E101, MG Apts, Kasarwadi, Pune";
            this.newCourierObj.courierTo = this.school.schoolName
                + ", "
                + this.school.address.line1
                + ", "
                + this.school.address.city
                + ", "
                + this.school.address.state
                + ", "
                + "PIN-"
                + this.school.address.pin;

            this.courierservice.getCourierByGRFNo(this.school.autoGenerated).then(courierObj => {
                if (courierObj) {
                    this.open('dialog1');
                }
                else {
                    this.getGFBookStockByInstituteId();
                }
            });
        }
    }

    addGFCourier() {
        this.newCourierObj.instituteID = 5910974510923776;
        this.newCourierObj.courierDispatchDate = this.courierDispatchDate;

        for (let i = 0; i < this.bookDetail.length; i++) {
            for (let j = 0; j < this.bookStocks.length; j++) {
                if (this.bookDetail[i].bookName == this.bookStocks[j].id) {
                    this.bookStocks[j].bookQty = this.bookDetail[i].totalStud;
                    this.newCourierObj.totalWeight += this.bookStocks[j].weight
                        * this.bookDetail[i].totalStud;
                    this.newCourierObj.bookLineItemList
                        .push(this.bookStocks[j]);

                }
            }
        }

        this.courierservice.addCourier(this.newCourierObj).then(courierObj => {
            console.log('Saved currentSchool:' + courierObj);
            this.newCourierObj = courierObj;
            if (this.newCourierObj.id) {
                this.router.navigate(['/courier-index/listcourier']);
            }
        });

    }

    getSchoolByAutoGeneratedID() {

        this.partnerschoolservice.getInstituteByGRFNo(this.school.autoGenerated).then(schoolObj => {

            this.school = schoolObj;

            this.newCourierObj.schoolName = this.school;
            this.newCourierObj.autoGenerated = this.school.autoGenerated;

            if (this.school.examDetailList != undefined) {
                for (let i = 0; i < this.school.examDetailList.length; i++) {
                    if (this.school.examDetailList[i].yearOfExam == this.yearOfExam) {
                        this.tempPartnerSchool.examDetailList = this.school.examDetailList[i];
                    }
                }
            }
            this.bookDetail = this.tempPartnerSchool.examDetailList.bookSummary.bookDetail;
            this.newCourierObj.totalFees = 0;
            this.newCourierObj.totalFees = this.tempPartnerSchool.examDetailList.bookSummary.amtForGRF80per;
            this.newCourierObj.totalWeight = 0;

            for (let i = 0; i < this.bookDetail.length; i++) {
                for (let j = 0; j < this.bookStocks.length; j++) {

                    if (this.bookDetail[i].bookName == this.bookStocks[j].id) {

                        this.newCourierObj.totalWeight = (this.newCourierObj.totalWeight)
                            + (this.bookStocks[j].weight * this.bookDetail[i].totalStud);
                    }
                }
            }
        });
    }

    open(key: any) {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;

        this.dialogRef = this.dialog.open(Dialog1, config);

        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
        });
    }

    getGFBookStockByInstituteId(): void {
        this.gfbookService.getGFBookByInstituteId(this.school.instituteID).then(list => {
            this.bookStocks = list;
            this.getSchoolByAutoGeneratedID();
        });
    }
}

@Component({
    selector: 'dialog1',
    template: `
  <h4>The courier for this school is already added. Please click Okay to go to courier list.</h4>
  <button md-raised-button (click)="gotolistCourier();dialogRef.close()">Okay</button>`
})
export class Dialog1 {
    constructor(public dialogRef: MdDialogRef<any>,
        private route: ActivatedRoute,
        private router: Router,
        private routeData: RouteData, ) { }

    gotolistCourier() {
        this.router.navigate(['/courier-index/listcourier']);
    }
}