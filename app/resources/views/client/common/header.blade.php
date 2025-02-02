<header>
    <div class="topbar-header">
        <div class="container">
            <div class="row ">
                <div class="col-md-12 col-12">
                    <div>
                        <div class="entry-topbar d-flex justify-content-between align-items-center">
                            <div class="left-topbar">
                                <ul class="list-unstyled m-0 d-flex align-items-center">
                                    <li>
                                        <a class="d-flex align-items-center fs-16" href="he-thong-cua-hang" title="Hệ thống cửa hàng">
                                            <i class="iconsax isax-shop pr-5 fs-24"></i>
                                            Hệ thống cửa hàng
                                        </a>
                                    </li>
                                    <li class="pl-30">
                                        <a class="color-black px-10 rounded bg-address box-location d-flex align-items-center" href="#">
                                            <i class="iconsax isax-location5 pr-5 fs-24"></i>
                                            Bạn đang ở :
                                            <span class="font-weight-bold pl-5">
                                                Hà Nội<i class="iconsax isax-arrow-down-1 pl-30"></i>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="right-topbar">
                                <ul class="list-unstyled m-0 d-flex align-items-center">
                                    <li class="pr-25">
                                        <span class="text-right-topbar pl-5 pr-10">Thời gian làm việc: </span>
                                        <span class="fs-16">8h -18h00</span>
                                        <span> từ </span>
                                        <span class="fs-16">T2 - CN</span>
                                    </li>
                                    <li class="d-flex">
                                        <a href="tel:0869.836.236" class="rounded-pill d-flex align-items-center hotline-top">
                                            <div class="icon-hotline-top bg-hightlight rounded-circle">
                                                <img class="img-fluid" data-src="/templates/fashion02/assets/media/icon/icon-phone-top.png" alt="icon">
                                            </div>
                                            <span class="text-right-topbar pl-5 pr-10  fs-16">0869.836.236</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="header-top py-15">
        <div class="container">
            <div class="row ">
                <div class="col-md-12 col-12">
                    <div class="">
                        <div class="logo-section">
                            <a href="/">
                                <img class="img-fluid" src="https://cdn.5sfood.vn/media/logo/5sfood-logo-home.png" alt="logo">
                            </a>
                        </div>
                    </div>
                    <div class="mx-lg-30 box-search">
                        <div class="form-search px-md-20">
                            <form action="/tim-kiem" method="get" autocomplete="off">
                                <div class="input-group ">
                                    <div class="icon-search position-relative">
                                        <i class="iconsax isax-search-normal-1 fs-24 position-absolute"></i>
                                        <input name="keyword" placeholder="Bạn đang cần tìm mua gì?" type="text" class="form-control" value="">
                                    </div>
                                    <button class="btn btn-submit ml-10" type="submit">Tìm kiếm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="">
                        <div class="d-flex align-items-center">
                            <div class="user-section entire-action-header fs-16">
                                <a class="" title="Đăng nhập" href="/member/login">Đăng nhập</a>
                                <a class="bg-hightlight text-white px-20 ml-15 btn-dang-ky " title="Đăng ký" href="/member/register">Đăng ký</a>
                            </div>
                            <div class="entire-action-header">
                                <a class="btn-mini-cart btn-action-header" nh-mini-cart="open" title="Giỏ hàng" href="#">
                                    <span class="position-relative">
                                        <img class="img-fluid" src="{{ asset('client/img/icon-cart.png')}}" alt="icon">
                                        <span nh-total-quantity-mini-cart class="items-number m-0">0</span>
                                    </span>
                                    <span class="fs-16 pl-10">Giỏ hàng</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="setting-menu flex-menu">
        <div class="container">
            <div class="row ">
                <div class="col-md-3 col-12">
                    <div class="menu-vertical">
                        <div class="menu-container">
                            <a class="btn-menu-mobile" nh-menu="btn-open" href="javascript:;">
                                <i class="las la-bars fs-17 fs-lg-15 color-white"></i>
                            </a>
                            <div class="back-drop"></div>
                            <nav class="menu-section" nh-menu="sidebar">
                                <div class="menu-top">
                                    <span class="menu-header">Menu</span>
                                    <a href="javascript:;" nh-menu="btn-close" class="close-sidebar effect-rotate">
                                        <i class="las la-times"></i>
                                    </a>
                                </div>
                                <ul>
                                    <li class="has-child ">
                                        <a href="/san-pham">
                                            <i>
                                                <img class="img-fluid pr-20" data-src="/templates/fashion02/assets/media/icon/icon-menu.png" alt="menu" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
                                            </i>Danh mục sản phẩm
                                        </a>
                                        <span class="grower"></span>
                                        <ul class="entry-menu dropdown">
                                            @foreach ($categories as $category)
                                                @if ($category->children->isNotEmpty()) 
                                                    <li class="has-child">
                                                        <a class="menu-link" href="{{ url('/category/' . $category->id) }}">
                                                            <img class="img-fluid" src="{{ $category->image ?? '/default-category.png' }}"">
                                                            <span class="ml-5">{{ $category->name }}</span>
                                                            <span class="child-indicator iconsax isax-arrow-right-3"></span>
                                                        </a>
                                                        <ul>
                                                            @foreach ($category->children as $child)
                                                                <li>
                                                                    <a class="menu-link" href="{{ url('/category/' . $child->id) }}">{{ $child->name }}</a>
                                                                </li>
                                                            @endforeach
                                                        </ul>
                                                    </li>
                                                @else
                                                    <li>
                                                        <a class="menu-link" href="{{ url('/category/' . $category->id) }}">
                                                            <img class="img-fluid" src="{{ $category->image ?? '/default-category.png' }}">
                                                            <span class="ml-5">{{ $category->name }}</span>
                                                        </a>
                                                    </li>
                                                @endif
                                            @endforeach
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="col-md-9 col-12">
                    <div class="">
                        <div class="section-policy">
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-6">
                                    <div class="policy-list-item d-flex align-items-center text-white">
                                        <div class="policy-image">
                                            <img class="img-fluid" src="{{ asset('client/img/icon-chat-luong.png')}}" alt="Chất lượng hàng đầu">
                                        </div>
                                        <span>Chất lượng hàng đầu<br/>Tiêu chuẩn Global GAP, 5s</span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-6">
                                    <div class="policy-list-item d-flex align-items-center text-white">
                                        <div class="policy-image">
                                            <img class="img-fluid" src="{{ asset('client/img/icon-gia-canh-tranh.png')}}" alt="Mức giá cạnh tranh">
                                        </div>
                                        <span>Mức giá cạnh tranh<br/>Nhập khẩu trực tiếp</span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-6">
                                    <div class="policy-list-item d-flex align-items-center text-white">
                                        <div class="policy-image">
                                            <img class="img-fluid" src="{{ asset('client/img/icon-so-che.png')}}" alt="Ready to eat/cook">
                                        </div>
                                        <span>Ready to eat/cook<br/>Thực phẩm sơ chế sẵn</span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-6">
                                    <div class="policy-list-item d-flex align-items-center text-white">
                                        <div class="policy-image">
                                            <img class="img-fluid" src="{{ asset('client/img/icon-giao-hang.png')}}" alt="Giao hàng tận nơi">
                                        </div>
                                        <span>Giao hàng tận nơi<br/>Nhanh chóng sau 30 phút</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>