import { Component, ReactNode } from 'react';
import { Select, Pagination as AntdPagination } from 'antd';
import { Button } from 'antd';
import { RightOutlined, LeftOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import './Pagination.scss';
import Utils, { rangeItemStr } from '@helpers/utils';
import { PaginationProps } from '~@types/pagination';

export default class Pagination extends Component<PaginationProps> {

  constructor(props: PaginationProps) {
    super(props);
  }

  public render(): ReactNode {
    const { totalPage, total, pageSize, pageSizeOptions, defaultCurrent, defaultPageSize, onChange } = this.props;
    let current: number;
    current = this.props.current || 0;

    let itemRender: PaginationProps['itemRender'];
    if (this.props.itemRender) itemRender = this.props.itemRender;
    else itemRender = (page, type, originalElement) => {
      if (type === 'prev') return <LeftOutlined />;
      if (type === 'next') return <RightOutlined />;
      return originalElement;
    };

    return (
      <>
        <div className="lib-pagination-group lib-table-pagination-center">
          <div className="lib-pagination">
            {this.showFirstButton()}
            <AntdPagination
              total={total}
              current={current}
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              defaultCurrent={defaultCurrent}
              defaultPageSize={defaultPageSize}
              showSizeChanger={false}
              itemRender={itemRender}
              onChange={onChange}
            />
            {this.showLastButton()}
          </div>

          {this.sizeChanger()}

          {this.props.isShowTotal && <div className="lib-pagination-total-text"><span>{'Showing ' + rangeItemStr(current, totalPage, total, pageSize)}</span></div>}

        </div>
      </>
    );
  }

  private showFirstButton = () => {
    if (!this.props.showFirstButton) return undefined;

    let classNames = 'lib-pagination-first ant-pagination-item';
    if (this.props.current === 1) classNames += ' ant-pagination-disabled';

    return (
      <>
        <Button className={classNames} title="First Page" icon={<DoubleLeftOutlined />} disabled={this.props.current === 1} onClick={() => this.onPageChange(1, this.props.pageSize)} />
      </>
    );
  }

  private showLastButton = () => {
    if (!this.props.showLastButton) return undefined;

    let classNames = 'lib-pagination-last ant-pagination-item';
    if (this.props.current === this.props.totalPage) classNames += ' ant-pagination-disabled';

    return (
      <>
        <Button className={classNames} title="Last Page" icon={<DoubleRightOutlined />} disabled={this.props.current === this.props.totalPage} onClick={() => this.onPageChange(this.props.totalPage, this.props.pageSize)} />
      </>
    );
  }

  private sizeChanger = () => {
    if (!this.props.showSizeChanger) return undefined;
    let { pageSizeOptions } = this.props;
    if (!pageSizeOptions) pageSizeOptions = Utils.pageSizeOption;
    return (
      <>
        <div className="lib-pagination-options">
          <Select
            style={{ minWidth: 50 }}
            showArrow
            dropdownClassName="lib-pagination-select-dropdown"
            value={this.props.pageSize}
            onChange={this.onPageSizeChange}
          >
            {pageSizeOptions.map(option => (
              <Select.Option key={option}>{option}</Select.Option>
            ))}
          </Select>
        </div>
      </>
    );
  }

  private onPageChange = (page: any, pageSize: any) => {
    if (this.props.onChange) this.props.onChange(page, pageSize);
  }

  private onPageSizeChange = (pageSize: number) => {
    let current: number;
    current = this.props.current || 0;
    if (this.props.onShowSizeChange) this.props.onShowSizeChange(current, pageSize);
  }
}
