import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Lieu } from './lieu';
import { LieuEtMesure } from './lieu-et-mesure';

declare var M: any;
@Injectable({
  providedIn: 'root'
})
export class RniService {

  private lieuxURL = "http://localhost:8080/rni/lieux";
  private lieuxEtMesures = "http://localhost:8080/pub/mapRni";
  private detailLieu = "http://localhost:8080/rni/detail-lieu";
  private chercheDetailLieu = "http://localhost:8080/rni/searchByRPLA";
  private importer = "http://localhost:8080/fichier/rniExcel";
  private transfertPdf = "http://localhost:8080/api/v1/transfertPdf";
  private telechargementPdf = "http://localhost:8080/api/v1/telechargeRapport"

  constructor(private httpClient: HttpClient) { }

  //affiche tout les lieux de mesures
  tousLesLieux(): Observable<LieuEtMesure[]> {
    return this.httpClient.get<LieuEtMesure[]>(`${this.lieuxURL}`);
  }

  //affiche tout les lieux et les mesures concerne
  //modifier pour afficher les mises a jour
  dataMap(): Observable<LieuEtMesure[]> {
    return this.httpClient.get<LieuEtMesure[]>(`${this.lieuxEtMesures}`);
  }

  //affiche les details d'un lieu
  trouverLieu(id: number): Observable<LieuEtMesure[]> {
    return this.httpClient.get<LieuEtMesure[]>(`${this.detailLieu}/${id}`);
  }

  //affiche les details d'un lieu en fonction de la recherche effectue
  //agit au niveau du composant de la carte
  rechercheAvance1(
    annee: any, region: string,
    province: string, localite: string): Observable<LieuEtMesure[]> {
    return this.httpClient.get<LieuEtMesure[]>(`${this.chercheDetailLieu}/${annee}/${region}/${province}/${localite}`)
  }

  //recuperation fichier excel
  importerFichierExcel(formdata: FormData): Observable<Object> {
    return this.httpClient.post<Object>(`${this.importer}`, formdata);
  }

  //transfert du rapport
  transfertRapport(formData:FormData):Observable<Object>{
    return this.httpClient.post<Object>(`${this.transfertPdf}`,formData)
  }

  //permet de telecharger le rapport
  // telechargerRapport(idMesure:number):Observable<HttpEvent<Blob>>{
    
  //   return this.httpClient.get(`${this.telechargementPdf}/${idMesure}`,{reportProgress:true,observe:'events',responseType:'blob'})
  // }

  telechargerRapport(idMesure:number):Observable<Blob>{
    
    return this.httpClient.get(`${this.telechargementPdf}/${idMesure}`,{responseType:'blob'})
  }
}
