const defaultShowCount: number = 4;

export class PaginationController implements angular.IController {
  public showCount: number;
  public currentPageIndex: number;
  public pageIndexTotalCount: number;
  public startPageIndex: number;
  private isForwardDirection: boolean;
  private action: (params: { $pageIndex: number }) => void;
  private averageShift: number;

  public constructor(private $scope: angular.IScope) { }

  public $onInit() {
    this.showCount = this.showCount || defaultShowCount;
    this.$scope.$watch(() => this.pageIndexTotalCount, () => {
      if (this.isValidData()) {
        this.$scope.$watch(() => this.currentPageIndex, (newValue: number, oldValue: number) => {
          if (newValue !== oldValue) {
            this.isForwardDirection = newValue > oldValue;
          }
          this.averageShift = (this.showCount - 1) / 2;
          let shift: number;
          if (this.isForwardDirection) {
            shift = Math.ceil(this.averageShift);
          } else {
            shift = Math.floor(this.averageShift);
          }
          this.startPageIndex = this.currentPageIndex - shift;
          if (this.startPageIndex < 0) {
            this.startPageIndex = 0;
          }
          if (this.pageIndexTotalCount < this.startPageIndex + this.showCount) {
            this.startPageIndex = this.pageIndexTotalCount - this.showCount + 1;
          }
        });
      }
    });
  }

  public isValidData() {
    return Number.isInteger(this.currentPageIndex) && Number.isInteger(this.pageIndexTotalCount);
  }
  public prevPage() {
    if (!this.isFirstPage()) {
      this.action({ $pageIndex: this.currentPageIndex - 1 });
    }
  }
  public nextPage() {
    if (!this.isLastPage()) {
      this.action({ $pageIndex: this.currentPageIndex + 1 });
    }
  }
  public certainPage(pageIndex: number) {
    if (this.currentPageIndex !== pageIndex) {
      this.action({ $pageIndex: pageIndex });
    }
  }
  public showLeftDots() {
    let shiftIndex = this.showCount - (this.isForwardDirection ? Math.floor(this.averageShift) : Math.ceil(this.averageShift));
    return this.currentPageIndex > shiftIndex;
  }
  public showRightDots() {
    let shiftIndex = this.pageIndexTotalCount - (this.showCount - (this.isForwardDirection ? Math.ceil(this.averageShift) : Math.floor(this.averageShift)));
    return this.currentPageIndex < shiftIndex;
  }
  public isFirstPage() {
    return this.currentPageIndex === 0;
  }
  public isLastPage() {
    return this.currentPageIndex === this.pageIndexTotalCount;
  }
}
