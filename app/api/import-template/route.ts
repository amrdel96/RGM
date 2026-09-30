import ExcelJS from 'exceljs';
import {requireStaff} from '../../../lib/auth';
import {importHeaders} from '../../../lib/imports';
import {failure} from '../../../lib/http';
export async function GET(request:Request){try{await requireStaff(['ADMIN']);if(new URL(request.url).searchParams.get('format')==='xlsx'){const book=new ExcelJS.Workbook();const sheet=book.addWorksheet('Machines');sheet.addRow(importHeaders);sheet.getRow(1).font={bold:true};sheet.columns.forEach(c=>c.width=24);return new Response(new Uint8Array(await book.xlsx.writeBuffer()),{headers:{'Content-Type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','Content-Disposition':'attachment; filename="RGM-import-template.xlsx"'}});}return new Response(importHeaders.join(',')+'\r\n',{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="RGM-import-template.csv"'}});}catch(e){return failure(e);}}
