export class EdibleTree{

    private imageURL: string;

    constructor(private name: string, private scientificName: string, private otherNames: string, private countryOfOrigin: string, private speciesCharacteristics: string, private valueAdded: string, private caution: boolean, private requiresPreperation: boolean, private notCommonlyEaten: boolean){
        if(otherNames === null){
            this.otherNames = "";
        }
    }

    public setImageURL(imageURL: string): void{
        this.imageURL = imageURL;
    }

    public getImageURL(): string{
        return this.imageURL;
    }

    public getName(): string{
        return this.name;
    }

    public getScientificName(): string{
        return this.scientificName;
    }

    public getOtherNames(): string{
        return this.otherNames;
    }

    public setOtherNames(otherNames: string): void{
        this.otherNames = otherNames;
    }

    public getCountryOfOrigin(): string{
        return this.countryOfOrigin;
    }

    public getSpeciesCharacteristics(): string{
        return this.speciesCharacteristics;
    }

    public getValueAdded(): string{
        return this.valueAdded;
    }

    private shouldBeCautious(): boolean{
        return this.caution
    }

    public shouldBePrepared(): boolean{
        return this.requiresPreperation;
    }

    public isNotCommonlyEaten(): boolean{
        return this.notCommonlyEaten;
    }
}